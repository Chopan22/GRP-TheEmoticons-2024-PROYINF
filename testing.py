import unittest
import requests


class TestPacienteAPI(unittest.TestCase):
    
    def setUp(self):
        self.base_url = "http://localhost:4000/routes/pacientes"

    def test_get_pacientes(self):
        response = requests.get(self.base_url)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_get_paciente(self):
        paciente_id = '67042d98bf12c553d9b41618'  # Cambia esto por un ID que sepas que existe
        response = requests.get(f"{self.base_url}/{paciente_id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], paciente_id)

    def test_crear_paciente(self):
        nuevo_paciente = {"nombre": "Juan", "edad": 30, "diagnostico": "Saludable"}
        response = requests.post(self.base_url, json=nuevo_paciente)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["nombre"], nuevo_paciente["nombre"])

    def test_borrar_paciente(self):
        paciente_id = '67042d98bf12c553d9b41618'  # Cambia esto por un ID que sepas que existe
        response = requests.delete(f"{self.base_url}/{paciente_id}")
        self.assertEqual(response.status_code, 204)

        # Verifica que el paciente ya no exista
        response = requests.get(f"{self.base_url}/{paciente_id}")
        self.assertEqual(response.status_code, 404)

if __name__ == "__main__":
    unittest.main()
