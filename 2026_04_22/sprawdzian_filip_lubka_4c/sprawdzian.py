__author__ = 'Filip Lubka 4c'
__copyright__ = 'Zespół Szkół Komunikacji'

import datetime
import json
from year_grade import year_grade
from models import Teacher, Student, Subject, Grades

from models.Teacher import Teacher
from models.Student import Student
from models.Subject import Subject
from models.Grades import Grades


def main():

    teachers: list[Teacher] = []
    students: list[Student] = []
    subjects: list[Subject] = []
    grades: list[Grades] = []

    with open("teachers.txt", "r", encoding="utf-8") as file:
        for line in file:
            values = line.strip().split()
            _id = int(values[0])
            name = values[1]
            surname = values[2]

            teacher = Teacher(_id, name, surname)
            teachers.append(teacher)

    with open('subjects.txt', 'r', encoding="utf-8") as file:
        for line in file:
            values = line.strip().split()
            _id = int(values[0])
            name = values[1]
            teacher_id = int(values[2])

            teacher = next(
                (t for t in teachers if t.id == teacher_id),
                None
            )

            if teacher is None:
                continue

            subject = Subject(_id, name, teacher)
            subjects.append(subject)

    with open('students.txt', 'r', encoding="utf-8") as file:
        for line in file:
            values = line.strip().split()
            _id = int(values[0])
            first_name = values[1]
            last_name = values[2]
            birthdate = datetime.datetime.strptime(values[3],'%Y-%m-%d').date()
            student = Student(_id, first_name, last_name, birthdate)
            students.append(student)

    with open('grades.txt', 'r', encoding="utf-8") as file:

        for line in file:
            parts = line.strip().split()

            student_id = int(parts[0])
            subject_id = int(parts[1])
            grades_str = parts[2]

            student = next((s for s in students if s.id == student_id), None)
            subject = next((s for s in subjects if s.id == subject_id), None)

            if student is None or subject is None:
                continue

            grade_obj = Grades(student, subject)

            for g in grades_str.split(","):
                grade_obj.add_grade(int(g))

            grades.append(grade_obj)

    print("Oceny i średnie poszczególnych uczniów.")

    for student in students:

        print(f"{student}:")

        student_grades = [g for g in grades if g.student == student]



        for g in student_grades:
            subject = g.subject
            grades_list = g.get_grades()
            average = g.get_average()
            final_grade = year_grade(average)

            print(f"\t{subject.name}:")
            print("\t\tOceny:", ", ".join(str(x) for x in grades_list))
            print(f"\t\tŚrednia: {round(average, 2)}")
            print(f"\t\tOcena końcowa: {final_grade}")
        print()

    student_json_list: list[dict] = []
    for student in students:
        student_data = {}
        subjects_dict = {}

        student_results = [g for g in grades if g.student == student]
        for g in student_results:
           avg = g.get_average()
           subjects_dict[g.subject.name] = {
               "Oceny": ", ".join(str(x) for x in g.get_grades()),
               "Srednia": avg,
               "Ocena roczna": year_grade(avg)
           }
        student_json_list.append({str(student): subjects_dict})
    with open("students.json", "w", encoding="utf-8") as jf:
        json.dump(student_json_list, jf, indent=4, ensure_ascii=False)

    print("="*50)
    print()

    subject_json_list: list[dict] = []

    for subject in subjects:
        all_subject_grades: list[int] = []
        for g in grades:
            if g.subject == subject:
                all_subject_grades.extend(g.get_grades())

        if all_subject_grades:
            sub_avg = round(sum(all_subject_grades) / len(all_subject_grades), 2)

        else:
            sub_avg = 0.00

        print(f"{subject.name}:")
        print(f"Nauczyciel: {subject.teacher}")
        print(f"Oceny: {', '.join(map(str, all_subject_grades))}")
        print(f"Średnia: {sub_avg}")
        print()

        subject_json_list.append({
            subject.name: {
                "Nauczyciel": str(subject.teacher),
                "Oceny": all_subject_grades,
                "Srednia": sub_avg
            }
        })

    with open("subjects.json", "w", encoding="utf-8") as jf:
        json.dump(subject_json_list, jf, indent=4, ensure_ascii=False)


if __name__ == '__main__':
    main()