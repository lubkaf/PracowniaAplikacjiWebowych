__author__ = 'Filip Lubka 4c'
__copyright__ = 'Zespół Szkół Komunikacji'
from models import Student, Subject


class Grades:
    def __init__(self, student: Student, subject: Subject ):
        self.grades = []
        self.student = student
        self.subject = subject

    def add_grade(self, grade) -> None:
        if grade < 1 or grade > 6:
            raise ValueError('Grade must be between 1 and 6')
        self.grades.append(grade)

    def get_grades(self) -> list[int]:
        return self.grades

    def get_average(self) -> float:
        sum = 0
        i = 0
        for grade in self.grades:
            sum += grade
            i+=1
        return sum/i

