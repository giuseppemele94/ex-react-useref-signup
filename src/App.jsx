import { useState } from 'react'


function App() {

  //nome completo
  const [fullname, setFullname] = useState("");
  //username
  const [username, setUsername] = useState("");
  //Password
  const [password, setPassword] = useState("");
  //specializzazione
  const [specialization, setSpecialization] = useState("");
  //anni di esperienza
  const [years, setYears] = useState("");
  //breve descrizione
  const [description, setDescription] = useState("");


  const submit = (e) => {
    e.preventDefault();


    // controllo campi vuoti
    if (
      !fullname.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specialization ||
      !years ||
      !description.trim()
    ) {
      alert("Compila tutti i campi");
      return;
    }

    // controllo anni di esperienza
    if (Number(years) <= 0) {
      alert("Gli anni di esperienza devono essere un numero positivo");
      return;
    }

    console.log({
      fullname,
      username,
      password,
      specialization,
      years: Number(years),
      description
    });
  }

  return (
    <div className='app'>
      <form className="form-card" onSubmit={submit}>

        {/** Nome completo */}
        <section>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Nome Completo" />
        </section>

        {/** Username */}
        <section>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username" />
        </section>

        {/** password */}
        <section >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password" />
        </section>

        {/** specializzazione */}
        <section>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">Seleziona una specializzazione</option>
            <option value="FullStack">FullStack</option>
            <option value="FrontEnd">Frond-end</option>
            <option value="BackEnd">Back-end</option>
          </select>
        </section>

        {/** anni esperienza */}
        <section >
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="anni di esperienza" />
        </section>

        {/** breve descrizione */}
        <section>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Scrivi qui..."
          ></textarea>
        </section>

        <button type="submit">Registrati</button>
      </form>
    </div>
  )
}

export default App
