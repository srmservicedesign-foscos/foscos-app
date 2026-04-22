from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


MOCK_FBO_FEEDBACK = [
    {
        "id": "F001",
        "rating": 4.6,
        "comment": "Loved the food and hygiene.",
        "images": [],
        "type": "good",
    },
    {
        "id": "F002",
        "rating": 1.6,
        "comment": "Floor was dirty near the kitchen entrance.",
        "images": ["evidence_01.jpg", "bill_01.jpg"],
        "type": "bad",
    },
    {
        "id": "F003",
        "rating": 2.3,
        "comment": "Food tasted stale, not fresh.",
        "images": ["evidence_02.jpg"],
        "type": "bad",
    },
    {
        "id": "F004",
        "rating": 4.3,
        "comment": "Service was quick and staff was polite.",
        "images": [],
        "type": "good",
    },
]


class ThankYouAction(BaseModel):
    feedback_id: str


class ResolveAction(BaseModel):
    feedback_id: str
    improvement_note: str


class FlagAction(BaseModel):
    feedback_id: str
    reason: Optional[str] = None


@router.get("/feedback")
def list_feedback():
    return MOCK_FBO_FEEDBACK


@router.post("/thank-you")
def send_thank_you(payload: ThankYouAction):
    return {"status": "sent", "feedback_id": payload.feedback_id}


@router.post("/resolve")
def mark_resolved(payload: ResolveAction):
    return {"status": "resolved", "feedback_id": payload.feedback_id}


@router.post("/flag")
def flag_incorrect(payload: FlagAction):
    return {"status": "flagged", "feedback_id": payload.feedback_id}
