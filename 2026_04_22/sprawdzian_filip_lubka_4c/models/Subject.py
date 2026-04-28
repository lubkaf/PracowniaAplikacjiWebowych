__author__ = 'Filip Lubka 4c'
__copyright__ = 'Zespół Szkół Komunikacji'
from models import Teacher


class Subject:
    def __init__(self, id: int, name: str, teacher: Teacher):
       self.id = id
       self.name = name
       self.teacher = teacher

