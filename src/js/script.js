let participantes = [
  {
    nome: "Arthur Morgan",
    email: "amorgan@outlook.com",
    dataInscricao: new Date(2024, 4, 25, 19, 30),
    dataCheckIn: new Date(2024, 4, 25, 21, 30),
  },
  {
    nome: "John Marston",
    email: "jmarston@outlook.com",
    dataInscricao: new Date(2024, 4, 26, 10, 0),
    dataCheckIn: new Date(2024, 4, 26, 12, 0),
  },
  {
    nome: "Dutch van der Linde",
    email: "dvan@gmail.com",
    dataInscricao: new Date(2024, 4, 27, 14, 30),
    dataCheckIn: new Date(2024, 4, 27, 16, 30),
  },
  {
    nome: "Sadie Adler",
    email: "sadler@gmail.com",
    dataInscricao: new Date(2024, 4, 28, 9, 15),
    dataCheckIn: new Date(2024, 4, 28, 11, 15),
  },
  {
    nome: "Charles Smith",
    email: "csmith@outlook.com",
    dataInscricao: new Date(2024, 4, 29, 11, 45),
    dataCheckIn: new Date(2024, 4, 29, 13, 45),
  },
  {
    nome: "Micah Bell",
    email: "mbell@gmail.com",
    dataInscricao: new Date(2024, 4, 30, 15, 30),
    dataCheckIn: new Date(2024, 4, 30, 17, 30),
  },
  {
    nome: "Abigail Roberts",
    email: "aroberts@gmail.com",
    dataInscricao: new Date(2024, 4, 31, 8, 0),
    dataCheckIn: new Date(2024, 4, 31, 10, 0),
  },
  {
    nome: "Jack Marston",
    email: "jmarstonjr@outlook.com",
    dataInscricao: new Date(2024, 5, 1, 13, 30),
    dataCheckIn: new Date(2024, 5, 1, 15, 30),
  },
  {
    nome: "Tilly Jackson",
    email: "tjackson@outlook.com",
    dataInscricao: new Date(2024, 5, 2, 10, 45),
    dataCheckIn: new Date(2024, 5, 2, 12, 45),
  },
  {
    nome: "Lenny Summers",
    email: "lsummers@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 9, 30),
    dataCheckIn: new Date(2024, 2, 3, 11, 30),
  },
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(participante.dataInscricao).fromNow();
    const dataCheckIn = participante.dataCheckIn
      ? dayjs(participante.dataCheckIn).fromNow()
      : `
        <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
          Confirmar check-in
        </button>
      `;
  
    return `
      <tr>
        <td>
          <strong>${participante.nome}</strong><br>
          <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
      </tr>
    `;
  };
  
  const atualizarLista = (participantes) => {
    let output = "";
    for (let participante of participantes) {
      output += criarNovoParticipante(participante);
    }
    document.querySelector("tbody").innerHTML = output;
  };
  
  atualizarLista(participantes);
  
  const adicionarParticipante = (event) => {
    event.preventDefault();
  
    const dadosForm = new FormData(event.target);
  
    const participante = {
      nome: dadosForm.get('nome'),
      email: dadosForm.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    };
  
    const participanteExiste = participantes.find(
      (p) => p.email === participante.email
    );
  
    if (participanteExiste) {
      return alert('Email já cadastrado');
    }
  
    participantes = [participante, ...participantes];
    atualizarLista(participantes);
  };
  
  const fazerCheckIn = (event) => {
    const mensagem = 'Tem certeza que deseja fazer o check-in?';
  
    if (confirm(mensagem) === false) {
      return;
    }
  
    const participante = participantes.find(
      (p) => p.email === event.target.dataset.email
    );
  
    participante.dataCheckIn = new Date();
  
    atualizarLista(participantes);
  };
  
  // Limpar o formulário após a inscrição
  document.querySelector("form").addEventListener("submit", (event) => {
    event.target.reset();
  });