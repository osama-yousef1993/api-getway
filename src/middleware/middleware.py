import time
import redis
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import logging
from config import settings

logger = logging.getLogger(__name__)


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.redis_client = redis.from_url(settings.REDIS_URL)

    async def dispatch(self, request: Request, call_next):
        # Get client IP
        client_ip = request.client.host

        # Create a unique key for rate limiting
        rate_limit_key = f"rate_limit:{client_ip}:{int(time.time() // 60)}"

        try:
            # Check current request count
            current_requests = self.redis_client.get(rate_limit_key)

            if (
                current_requests
                and int(current_requests) >= settings.RATE_LIMIT_PER_MINUTE
            ):
                logger.warning(f"Rate limit exceeded for IP: {client_ip}")
                return Response(
                    content='{"detail": "Rate limit exceeded"}',
                    status_code=429,
                    media_type="application/json",
                )

            # Increment request count
            pipeline = self.redis_client.pipeline()
            pipeline.incr(rate_limit_key, 1)
            pipeline.expire(rate_limit_key, 60)  # Expire after 1 minute
            pipeline.execute()

        except redis.RedisError as e:
            logger.error(f"Redis error in rate limiting: {e}")
            # Continue without rate limiting if Redis is down

        response = await call_next(request)
        return response


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()

        response = await call_next(request)

        process_time = time.time() - start_time
        logger.info(
            f'{request.client.host} - "{request.method} {request.url.path}" '
            f"{response.status_code} - {process_time:.3f}s"
        )

        response.headers["X-Process-Time"] = str(process_time)
        return response
