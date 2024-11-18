import unittest
import requests
import json

class TestPacienteAPI(unittest.TestCase):
    
    def setUp(self):
        self.base_url = "http://localhost:4000/api"
        self.login_url = f"{self.base_url}/usuarios/login"
        self.pacientes_url = f"{self.base_url}/pacientes"
        
        # Datos de inicio de sesión
        self.credenciales = {
            "email": "matias@usm.cl",
            "password": "Colo-Colo1234"
        }
        
        # Iniciar sesión y obtener el token
        response = requests.post(self.login_url, json=self.credenciales)
        self.token = response.json().get("token")
        
        # Configurar los headers para incluir el token en cada solicitud
        self.headers = {"Authorization": f"Bearer {self.token}"}

    def test_get_pacientes(self):
        response = requests.get(self.pacientes_url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_get_paciente(self):
        # Primero creamos un paciente para asegurarnos de que existe
        nuevo_paciente = {
            "nombre": "Paciente de Prueba",
            "rut": "12345678-9",
            "fecha_nacimiento": "1990-01-01",
            "sexo": "Masculino",
            "telefono": "123456789"
        }
        crear_response = requests.post(self.pacientes_url, json=nuevo_paciente, headers=self.headers)
        paciente_id = crear_response.json()["_id"]

        # Ahora obtenemos el paciente creado
        response = requests.get(f"{self.pacientes_url}/{paciente_id}", headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["_id"], paciente_id)

        # Limpiamos borrando el paciente creado
        requests.delete(f"{self.pacientes_url}/{paciente_id}", headers=self.headers)

    def test_crear_paciente(self):
        nuevo_paciente = {
            "nombre": "Juan Pérez",
            "rut": "98765432-1",
            "fecha_nacimiento": "1985-05-15",
            "sexo": "Masculino",
            "telefono": "987654321"
        }
        response = requests.post(self.pacientes_url, json=nuevo_paciente, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["nombre"], nuevo_paciente["nombre"])

        # Limpiamos borrando el paciente creado
        paciente_id = response.json()["_id"]
        requests.delete(f"{self.pacientes_url}/{paciente_id}", headers=self.headers)

    def test_borrar_paciente(self):
        # Primero creamos un paciente para luego borrarlo
        nuevo_paciente = {
            "nombre": "Paciente Temporal",
            "rut": "11111111-1",
            "fecha_nacimiento": "2000-12-31",
            "sexo": "Femenino",
            "telefono": "111111111"
        }
        crear_response = requests.post(self.pacientes_url, json=nuevo_paciente, headers=self.headers)
        paciente_id = crear_response.json()["_id"]

        # Ahora borramos el paciente
        response = requests.delete(f"{self.pacientes_url}/{paciente_id}", headers=self.headers)
        self.assertEqual(response.status_code, 200)

        # Verificamos que el paciente ya no exista
        get_response = requests.get(f"{self.pacientes_url}/{paciente_id}", headers=self.headers)
        self.assertEqual(get_response.status_code, 400)  # Asumiendo que 400 es el código para "No existe el paciente"

if __name__ == "__main__":
    unittest.main()