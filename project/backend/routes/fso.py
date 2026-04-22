from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


MOCK_ALL_COMPLAINTS = [
    {
        "id": "C001",
        "restaurant": "Green Leaf Restaurant",
        "license": "10012345000123",
        "rating": 2.0,
        "complaint": "Stale vegetables in salad.",
        "consumer_name": "Rahul Sharma",
        "consumer_phone": "+91-9876543210",
        "status": "Under Review",
    },
    {
        "id": "C003",
        "restaurant": "Tandoor House",
        "license": "10012345000789",
        "rating": 1.6,
        "complaint": "Dirty kitchen visible from window.",
        "consumer_name": "Anita Verma",
        "consumer_phone": "+91-9988776655",
        "status": "Pending",
    },
    {
        "id": "C005",
        "restaurant": "South Express",
        "license": "10012345001122",
        "rating": 2.6,
        "complaint": "Staff not wearing gloves.",
        "consumer_name": "Karthik R.",
        "consumer_phone": "+91-9090909090",
        "status": "Pending",
    },
]

MOCK_FBOS = [
    {
        "license": "10012345000123",
        "name": "Green Leaf Restaurant",
        "location": "Bengaluru",
        "complaints": 3,
    },
    {
        "license": "10012345000456",
        "name": "Spice Junction",
        "location": "Kolkata",
        "complaints": 1,
    },
    {
        "license": "10012345000789",
        "name": "Tandoor House",
        "location": "New Delhi",
        "complaints": 5,
    },
    {
        "license": "10012345000991",
        "name": "Coastal Catch",
        "location": "Mumbai",
        "complaints": 0,
    },
    {
        "license": "10012345001122",
        "name": "South Express",
        "location": "Chennai",
        "complaints": 2,
    },
]


class ComplaintAction(BaseModel):
    complaint_id: str
    note: Optional[str] = None


@router.get("/complaints")
def list_complaints():
    return MOCK_ALL_COMPLAINTS


@router.get("/fbos")
def list_fbos():
    return MOCK_FBOS


@router.post("/warning")
def issue_warning(payload: ComplaintAction):
    return {"status": "warning_issued", "complaint_id": payload.complaint_id}


@router.post("/inspection")
def assign_inspection(payload: ComplaintAction):
    return {"status": "inspection_assigned", "complaint_id": payload.complaint_id}


@router.post("/resolve")
def mark_resolved(payload: ComplaintAction):
    return {"status": "resolved", "complaint_id": payload.complaint_id}
