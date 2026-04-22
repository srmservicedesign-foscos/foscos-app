# FoSCoS Grievance Portal (Full-Stack Scaffold)

A modular grievance portal for consumers, Food Business Operators (FBOs) and
Food Safety Officers (FSOs). UI is plain HTML/CSS/JS; backend is FastAPI with
mock data. No database / Firebase yet.

## Structure

```
project/
├── backend/
│   ├── main.py            # FastAPI app, serves frontend + mounts routers
│   ├── requirements.txt
│   └── routes/
│       ├── consumer.py
│       ├── fbo.py
│       └── fso.py
└── frontend/
    ├── consumer/
    │   ├── index.html     # QR-entry, nearby list, search, public view
    │   ├── rating.html    # 3-parameter rating + conditional evidence + OTP
    │   ├── dashboard.html # Phone+OTP login, past complaints
    │   └── track.html     # Complaint timeline
    ├── fbo/
    │   └── dashboard.html
    ├── fso/
    │   └── dashboard.html
    └── shared/
        ├── styles.css
        └── script.js
```

## Run

```bash
cd project/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Open:

- Consumer: http://localhost:8000/consumer/index.html
- FBO:      http://localhost:8000/fbo/dashboard.html
- FSO:      http://localhost:8000/fso/dashboard.html
- API docs: http://localhost:8000/docs

## Notes

- OTP is UI-only (any 6 digits accepted).
- Mock data lives in `backend/routes/*.py` and `frontend/shared/script.js`.
- Database integration is intentionally deferred.
