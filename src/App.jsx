import { useState,useRef, useEffect } from 'react'

function App() {

  //nome completo
  const fullnameRef = useRef();
  //specializzazione
  const specializationRef = useRef();
  //anni di esperienza
  const yearsRef = useRef(); 


  //username
  const [username, setUsername] = useState("");
  //Password
  const [password, setPassword] = useState("");
  //breve descrizione
  const [description, setDescription] = useState("");

  // stringhe utili per i controlli di username e password
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~\``;

  // -------- VALIDAZIONE USERNAME IN TEMPO REALE --------
  // assumo inizialmente che lo username sia valido
  let validUsername = true;

  // controllo lunghezza minima
  if (username.length < 6) {
    validUsername = false;
  }

  // controllo che contenga solo lettere e numeri
  // trasformo tutto in minuscolo così posso confrontare con la stringa letters
  for (let char of username.toLowerCase()) {
    if (!letters.includes(char) && !numbers.includes(char)) {
      validUsername = false;
    }
  }

  // -------- VALIDAZIONE PASSWORD IN TEMPO REALE --------
  // variabili di appoggio per capire se c'è almeno una lettera, un numero e un simbolo
  let hasLetter = false;
  let hasNumber = false;
  let hasSymbol = false;

  for (let char of password.toLowerCase()) {
    if (letters.includes(char)) {
      hasLetter = true;
    }

    if (numbers.includes(char)) {
      hasNumber = true;
    }

    if (symbols.includes(char)) {
      hasSymbol = true;
    }
  }

  // la password è valida solo se:
  // - ha almeno 8 caratteri
  // - contiene almeno una lettera
  // - contiene almeno un numero
  // - contiene almeno un simbolo
  const validPassword =
    password.length >= 8 && hasLetter && hasNumber && hasSymbol;

  // -------- VALIDAZIONE DESCRIZIONE IN TEMPO REALE --------
  // trim() elimina gli spazi iniziali e finali
  const trimmedDescription = description.trim();

  // la descrizione è valida se ha tra 100 e 1000 caratteri
  const validDescription =
    trimmedDescription.length >= 100 && trimmedDescription.length <= 1000;


  const submit = (e) => {
    e.preventDefault();

    //valori non controllati
    const fullName = fullnameRef.current.value;
    const specialization = specializationRef.current.value;
    const years = yearsRef.current.value; 
    // controllo campi vuoti
    if (
      !fullName.trim() ||
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



    // se tutti i controlli sono superati, stampo i dati in console
    console.log({
      fullName,
      username,
      password,
      specialization,
      years: Number(years),
      description: trimmedDescription
    });
  }

/* FOCUS AUTOMATICO AL PRIMO INPUT(FULLNAME) * */
  useEffect(() => {
    fullnameRef.current.focus();
   
  },[]); 


  /**RESET DEGLI INPUT */

  
  function resetInput() {

    //input non controllati
    fullnameRef.current.value=""; 
    specializationRef.current.value="";
    yearsRef.current.value=""; 

    // reset input controllati
    setUsername("");
    setPassword("");
    setDescription("");

    // rimetto il focus sul primo input
    fullnameRef.current.focus();

  }



  return (
    <div className='app'>
      <form className="form-card" onSubmit={submit}>

        {/** Nome completo */}
        <section>
          <input
            type="text"
            ref={fullnameRef}
            placeholder="Nome Completo"
          />
        </section>

        {/** Username */}
        <section>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />

          {/** messaggio mostrato in tempo reale */}
          {username && (
            <strong style={{ color: validUsername ? "green" : "red" }}>
              {validUsername
                ? "Username valido"
                : "Almeno 6 caratteri, solo lettere e numeri"}
            </strong>
          )}
        </section>

        {/** password */}
        <section>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          {/** messaggio mostrato in tempo reale */}
          {password && (
            <strong style={{ color: validPassword ? "green" : "red" }}>
              {validPassword
                ? "Password valida"
                : "Minimo 8 caratteri, 1 lettera, 1 numero e 1 simbolo"}
            </strong>
          )}
        </section>

        {/** specializzazione */}
        <section>
          <select
            ref={specializationRef}
            
          >
            <option value="">Seleziona una specializzazione</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </section>

        {/** anni esperienza */}
        <section>
          <input
            type="number"
            
            ref={yearsRef}
            placeholder="anni di esperienza"
          />
        </section>

        {/** breve descrizione */}
        <section>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Scrivi qui..."
          ></textarea>

          {/** messaggio mostrato in tempo reale */}
          {description && (
            <strong style={{ color: validDescription ? "green" : "red" }}>
              {validDescription
                ? "Descrizione valida"
                : "La descrizione deve contenere tra 100 e 1000 caratteri"}
            </strong>
          )}
        </section>

        <button type="submit">Registrati</button>
       <button  type="button" onClick={resetInput}>Reset</button>
      </form>
       
    </div>
  )
}

export default App