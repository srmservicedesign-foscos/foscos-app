from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()


MOCK_RESTAURANTS = [
    {
        "id": "R001",
        "name": "Green Leaf Restaurant",
        "location": "MG Road, Bengaluru",
        "license": "10012345000123",
        "rating": 4.3,
    },
    {
        "id": "R002",
        "name": "Spice Junction",
        "location": "Park Street, Kolkata",
        "license": "10012345000456",
        "rating": 3.8,
    },
    {
        "id": "R003",
        "name": "Tandoor House",
        "location": "CP, New Delhi",
        "license": "10012345000789",
        "rating": 4.6,
    },
    {
        "id": "R004",
        "name": "Coastal Catch",
        "location": "Marine Drive, Mumbai",
        "license": "10012345000991",
        "rating": 4.1,
    },
    {
        "id": "R005",
        "name": "South Express",
        "location": "T. Nagar, Chennai",
        "license": "10012345001122",
        "rating": 3.2,
    },
]

MOCK_COMPLAINTS = [
    {
        "id": "C001",
        "restaurant": "Green Leaf Restaurant",
        "rating": 2.0,
        "status": "Under Review",
        "date": "2026-04-10",
        "comment": "Stale vegetables in salad.",
    },
    {
        "id": "C002",
        "restaurant": "Spice Junction",
        "rating": 4.3,
        "status": "Action Taken",
        "date": "2026-03-28",
        "comment": "Great hygiene, small billing issue.",
    },
    {
        "id": "C003",
        "restaurant": "Tandoor House",
        "rating": 1.6,
        "status": "Pending",
        "date": "2026-04-18",
        "comment": "Dirty kitchen visible from window.",
    },
]


class RatingSubmission(BaseModel):
    restaurant_id: str
    premise_cleanliness: int
    food_freshness: int
    staff_hygiene: int
    comment: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None


class UnregisteredReport(BaseModel):
    restaurant_name: str
    location: str
    comments: Optional[str] = None


@router.get("/restaurants")
def list_restaurants(q: Optional[str] = None):
    if not q:
        return MOCK_RESTAURANTS
    q_low = q.lower()
    return [
        r for r in MOCK_RESTAURANTS
        if q_low in r["name"].lower() or q_low in r["license"].lower()
    ]


@router.get("/restaurants/{restaurant_id}")
def get_restaurant(restaurant_id: str):
    for r in MOCK_RESTAURANTS:
        if r["id"] == restaurant_id:
            return r
    return {"error": "not found"}


@router.post("/rating")
def submit_rating(payload: RatingSubmission):
    avg = (
        payload.premise_cleanliness
        + payload.food_freshness
        + payload.staff_hygiene
    ) / 3
    return {
        "status": "submitted",
        "complaint_id": "C999",
        "average_rating": round(avg, 2),
    }


@router.post("/report-unregistered")
def report_unregistered(payload: UnregisteredReport):
    return {"status": "submitted", "reference_id": "U001"}


@router.get("/complaints")
def list_complaints(phone: Optional[str] = None):
    return MOCK_COMPLAINTS


@router.get("/complaints/{complaint_id}")
def get_complaint(complaint_id: str):
    for c in MOCK_COMPLAINTS:
        if c["id"] == complaint_id:
            return {
                **c,
                "timeline": [
                    {"stage": "Submitted", "done": True, "date": c["date"]},
                    {
                        "stage": "Under Review",
                        "done": c["status"] in ("Under Review", "Action Taken"),
                        "date": "2026-04-12",
                    },
                    {
                        "stage": "Action Taken",
                        "done": c["status"] == "Action Taken",
                        "date": "2026-04-20" if c["status"] == "Action Taken" else None,
                    },
                ],
            }
    return {"error": "not found"}


@router.post("/otp/send")
def send_otp(phone: str):
    return {"status": "sent", "phone": phone}


@router.post("/otp/verify")
def verify_otp(phone: str, code: str):
    return {"status": "verified", "phone": phone}
