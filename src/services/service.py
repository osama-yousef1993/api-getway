import httpx
from fastapi import HTTPException, Request
import logging
from config import settings
from typing import Dict, Any
import json

logger = logging.getLogger(__name__)


class ServiceHandler:
    def __init__(self):
        self.services = settings.SERVICES
        self.timeout = settings.REQUEST_TIMEOUT

    async def forward_request(
        self, service_name: str, path: str, request: Request
    ) -> Any:
        """
        Forward the incoming request to the appropriate service
        """
        if service_name not in self.services:
            raise HTTPException(
                status_code=404, detail=f"Service '{service_name}' not found"
            )

        service_url = self.services[service_name]
        target_url = f"{service_url}/{path}" if path else service_url

        logger.info(f"Forwarding request to {target_url}")

        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                # Prepare headers (remove hop-by-hop headers)
                headers = self._prepare_headers(request)

                # Forward the request
                response = await client.request(
                    method=request.method,
                    url=target_url,
                    headers=headers,
                    content=await request.body(),
                    params=dict(request.query_params),
                )

                # Log the response
                logger.info(f"Response from {service_name}: {response.status_code}")

                return self._prepare_response(response)

        except httpx.TimeoutException:
            logger.error(f"Timeout calling service {service_name}")
            raise HTTPException(status_code=504, detail="Service timeout")
        except httpx.RequestError as e:
            logger.error(f"Error calling service {service_name}: {str(e)}")
            raise HTTPException(
                status_code=503, detail=f"Service {service_name} unavailable"
            )

    def _prepare_headers(self, request: Request) -> Dict[str, str]:
        """Prepare headers for forwarding, removing hop-by-hop headers"""
        headers = dict(request.headers)

        # Remove hop-by-hop headers
        hop_by_hop_headers = [
            "connection",
            "keep-alive",
            "proxy-authenticate",
            "proxy-authorization",
            "te",
            "trailers",
            "transfer-encoding",
            "upgrade",
            "content-length",
            "host",
        ]

        for header in hop_by_hop_headers:
            headers.pop(header, None)

        return headers

    def _prepare_response(self, response: httpx.Response):
        """Prepare the response to return to client"""
        content = response.content
        media_type = response.headers.get("content-type", "application/json")

        # Try to parse JSON for logging
        try:
            if content:
                response_data = json.loads(content)
                logger.debug(f"Response data: {response_data}")
        except Exception:
            pass  # Not JSON, that's fine

        return content, response.status_code, media_type


service_handler = ServiceHandler()
