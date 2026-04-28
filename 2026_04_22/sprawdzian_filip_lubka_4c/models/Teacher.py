__author__ = 'Filip Lubka 4c'
__copyright__ = 'Zespół Szkół Komunikacji'

class Teacher:
    def __init__(self,id: int, name: str, surname: str):
        self.id = id
        self.name = name
        self.surname = surname

    def __str__(self) -> str:
        return f'{self.name} {self.surname}'

