from pydantic import BaseSettings
from dotenv import load_dotenv
import os
from typing import Dict


load_dotenv()


class Setting(BaseSettings):
    # server configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"

    # services configuration
    SERVICES: Dict[str, str] = {
        "auth": os.getenv("AUTH_SERVICE_URL", "http://localhost:8001"),
        "portfolio": os.getenv("PORTFOLIO_SERVICE_URL", "http://localhost:8002"),
        "markets": os.getenv("MARKETS_SERVICE_URL", "http://localhost:8003"),
    }

    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", 100))

    REQUEST_TIMEOUT: int = int(os.getenv("REQUEST_TIMEOUT", 30))  # seconds

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Setting()
