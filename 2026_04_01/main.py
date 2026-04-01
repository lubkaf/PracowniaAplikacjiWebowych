
class Student:
    def __init__(self, student_id: int, first_name: str, last_name: str, age: int):
        self.student_id = int(student_id)
        self.first_name = str(first_name)
        self.last_name = str(last_name)
        self.age = int(age)
        self.courses: list[str] = []

    def display_student(self):
        course_list = ", ".join(self.courses)
        return f"{self.student_id}) {self.first_name}  {self.last_name} ({self.age} lat): {course_list}"


class Course:
    def __init__(self, student_id:int, course_name:str):
        self.student_id = int(student_id)
        self.course_name = str(course_name)


def import_data_from_file():
    students = {}

    try:
        with open('students.txt', 'r', encoding='utf-8') as file:
            for line in file:
                parts = line.strip().split(',')
                if len(parts) == 4:
                    s_id = int(parts[0])
                    student = Student(s_id, parts[1].strip(), parts[2].strip(), int(parts[3]))
                    students[s_id] = student

    except FileNotFoundError:
        print('Nie znaleziono pliku students.txt')
        return

    try:
        with open('courses.txt', 'r', encoding='utf-8') as file:
            for line in file:
                parts = line.strip().split(',')
                if len(parts) == 2:
                    s_id = int(parts[0])
                    course_name = parts[1].strip()

                    if s_id in students:
                        students[s_id].courses.append(course_name)
    except FileNotFoundError:
        print('Nie znaleziono pliku courses.txt')
        return

    return students


def show_students(students: dict):
    for student in students.values():
        student_data = student.display_student()
        print(student_data)
        filename = f"{student.first_name.lower()}_{student.last_name.lower()}.txt"
        with open(filename, 'w', encoding='utf-8') as output:
            output.write("Courses:\n")
            for course in student.courses:
                output.write(f"{course}\n")


if __name__ == '__main__':
    students = import_data_from_file()
    show_students(students)
