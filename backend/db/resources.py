from sqlalchemy.orm import Session
from .database import Resource

def get_resources(db: Session, category: str = None):
    query = db.query(Resource)
    if category:
        query = query.filter(Resource.category == category)
    return query.all()

def add_resource(db: Session, title: str, content: str, category: str):
    resource = Resource(title=title, content=content, category=category)
    db.add(resource)
    db.commit()
    return resource