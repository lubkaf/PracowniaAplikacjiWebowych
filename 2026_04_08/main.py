from typing import List, Tuple, Optional


def read_graph() -> Optional[Tuple[List[List[int]], int]]:
    try:
        with open('graph.txt', 'r') as f:
            line = f.readline().strip()
            if not line.isdigit():
                print("Niepoprawny format danych, na początku powinna być liczba wierzchołków.")
                return None
            num_vertices = int(line)

            adj_list: List[List[int]] = []
            for line in f:
                parts = line.strip().split()
                if not parts:
                    continue
                neighbours = [int(x) for x in parts[1:]]
                adj_list.append(neighbours)
            return adj_list, num_vertices

    except FileNotFoundError:
        print("File 'graph.txt' not found.")
        return None

def write_neighbours_list(adj_list: List[List[int]]) -> None:
    print("Lista sąsiedztwa:")
    for i, neighbours in enumerate(adj_list):
        neighbours_str = ', '.join(map(str, neighbours))
        print(f"Sąsiadami wierzchołka {i} są:  {neighbours_str}")

def list_to_matrix(adj_list: List[List[int]], num_vertices: int):
    matrix = [[0 for _ in range(num_vertices)] for _ in range(num_vertices)]
    for i, neighbours in enumerate(adj_list):
        for neighbour in neighbours:
            matrix[i][neighbour] = 1
    return matrix

def write_matrix(matrix: List[List[int]]) -> None:
    print("Macierz sąsiedztwa:")
    for row in matrix:
        print(' '.join(map(str, row)))

def main()->None:
    result = read_graph()
    if result is not None:
        adj_list, num_vertices = result
        write_neighbours_list(adj_list)

        matrix = list_to_matrix(adj_list, num_vertices)
        write_matrix(matrix)


if __name__ == '__main__':
    main()
