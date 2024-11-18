const Home = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <h1 style={{ fontSize: "3rem", marginBottom: "30px" }}>
                Emoticons, llevando la tecnología a la salud
            </h1>
            <img
                src="/imagen-examen-home.jpeg"
                alt="Emoticons"
                style={{
                    width: "800px",
                    height: "auto",
                    marginBottom: "40px",
                }}
            />
            <p style={{ fontSize: "1.8rem", lineHeight: "1.5" }}>
                En emoticons trabajamos con los doctores para entregar una plataforma que
                permita ver la evolución de los pacientes y la investigación para un mundo
                sin enfermedades.
            </p>
        </div>
    );
};

export default Home;

