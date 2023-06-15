'use client'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Onboarding() {
  const [cookies] = useCookies('user');
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender_identity: "",
    gender_interest: "",
    url: "",
    discipline: "",
    experience_level: "",
    training_preferences: "",
    matches: []
  });

  const router = useRouter();

  useEffect(() => {
    const checkDiscipline = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user', {
          params: {
            userId: formData.user_id
          }
        });

        const user = response.data;
        const hasDiscipline = user && user.discipline;

        setFormData((prevState) => ({
          ...prevState,
          discipline: hasDiscipline ? user.discipline : ""
        }));
      } catch (err) {
        console.log(err);
      }
    };

    if (formData.user_id) {
      checkDiscipline();
    }
  }, [formData.user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/user', { formData });
      const success = response.status === 200;

      if (success) router.push('/Dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const getTitleText = () => {
    if (!formData.discipline) {
      return "CREAR CUENTA";
    } else {
      return "ACTUALIZAR DATOS";
    }
  };

  return (
    <>
      <div className="onboarding">
        <div className="header">
          <h2>{getTitleText()}</h2>
        </div>
        

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name" className="dato">Nombre</label>
            <input
              id="first_name"
              type='text'
              name="first_name"
              placeholder="Nombre"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label className="dato">Fecha de Nacimiento</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label className="dato">Género</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Hombre</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Mujer</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">Otro</label>
            </div>

            <label className="dato">Género de interés</label>

            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Hombre</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Mujer</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Cualquiera</label>
            </div>

            <label htmlFor="url" className="dato">Foto de perfil</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && <img src={formData.url} alt="profile pic preview" />}
            </div>

            <label htmlFor="discipline" className="dato">Disciplina deportiva</label>
            <select
              id="discipline"
              name="discipline"
              value={formData.discipline}
              onChange={handleChange}
              required={true}
            >
              <option value="">Selecciona una disciplina</option>
              <option value="Fútbol">Fútbol</option>
              <option value="Baloncesto">Baloncesto</option>
              <option value="Natación">Natación</option>
              <option value="Tenis">Tenis</option>
              <option value="Atletismo">Atletismo</option>
              <option value="Gimnasia">Gimnasia</option>
              <option value="Ciclismo">Ciclismo</option>
              <option value="Voleibol">Voleibol</option>
              <option value="Hockey">Hockey</option>
              <option value="Rugby">Rugby</option>
              <option value="Boxeo">Boxeo</option>
              <option value="Escalada">Escalada</option>
              <option value="Yoga">Yoga</option>
              <option value="Pilates">Pilates</option>
              <option value="Artes marciales">Artes marciales</option>
              <option value="Esgrima">Esgrima</option>
              <option value="Surf">Surf</option>
              <option value="Snowboard">Snowboard</option>
              <option value="Esquí">Esquí</option>
            </select>

            <label htmlFor="experience_level" className="dato">Nivel de experiencia</label>
            <select
              id="experience_level"
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              required={true}
            >
              <option value="">Selecciona un nivel de experiencia</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>

            <input
              type="text"
              name="training_preferences"
              value={formData.training_preferences}
              onChange={handleChange}
              placeholder="Escribe tus preferencias de entrenamiento..."
              required={true}
            />

            <input type="submit" className="enviar"/>
          </section>
        </form>
      </div>
    </>
  )
}
