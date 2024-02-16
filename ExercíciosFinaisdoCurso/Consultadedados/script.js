//validar cpf
function validarCPF(cpf) {
  var cpfRegex = /^(?:(\d{3}).(\d{3}).(\d{3})-(\d{2}))$/;
  if (!cpfRegex.test(cpf)) {
      return false;
  }

  var numeros = cpf.match(/\d/g).map(Number);
  var soma = numeros.reduce((acc, cur, idx) => {
      if (idx < 9) {
          return acc + cur * (10 - idx);
      }
      return acc;
  }, 0);

  var resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
      resto = 0;
  }

  if (resto !== numeros[9]) {
      return false;
  }

  soma = numeros.reduce((acc, cur, idx) => {
      if (idx < 10) {
          return acc + cur * (11 - idx);
      }
      return acc;
  }, 0);

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
      resto = 0;
  }

  if (resto !== numeros[10]) {
      return false;
  }

  return true;
}

//formatar data 

function formatarData(dateString) {
  const data = new Date(dateString);
  data.setUTCDate(data.getUTCDate() + 1); // Adiciona 1 dia para compensar o fuso horário
  data.setUTCDate(data.getUTCDate() - 1); // Subtrai 1 dia para corrigir
  const dia = data.getUTCDate().toString().padStart(2, '0');
  const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
  const ano = data.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
}
//formatar telefone
function formatarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, '');
  const regex = /^(\d{2})(\d{5})(\d{4})$/;
  const telefoneFormatado = numeros.replace(regex, '($1) $2-$3');
  return telefoneFormatado;
}

function validarCEP(cep) {
  const regexCEP = /^[0-9]{8}$/;
  return regexCEP.test(cep);
}

async function preencherEndereco(cep) {
  if (validarCEP(cep)) {
      try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
              return {
                  logradouro: data.logradouro,
                  bairro: data.bairro,
                  cidade: data.localidade,
                  estado: data.uf
              };
          } else {
              alert('CEP não encontrado, por favor, insira um CEP válido.');
              return null;
          }
      } catch (error) {
          console.error('Erro ao buscar CEP:', error);
          alert('Erro ao buscar o CEP, por favor, tente novamente mais tarde.');
          return null;
      }
  } else {
      alert('Por favor, insira um CEP válido, no formato XXXXXXXX.');
      return null;
  }
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function respostas(nome, sobrenome, email, cpf, nascimento, tel, res, pron, endereco) {
  var fcpfStatus = validarCPF(cpf) ? 'válido' : 'inválido';
  var fmailStatus = validarEmail(email) ? 'válido' : 'inválido';

  if (pron == 'feminino') {
    if(fcpfStatus=='válido' && fmailStatus=='válido'){
        res.innerText = `Olá,  prezada ${nome} ${sobrenome} nascida em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail e CPF estão válidos!`;
    }else if(fcpfStatus=='inválido' && fmailStatus=='inválido'){
        res.innerText = `Olá,  prezada ${nome} ${sobrenome} nascida em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail e CPF estão inválidos!`;
    }else{
        if(fcpfStatus=='válido' && fmailStatus=='inválido'){
            res.innerText = `Olá,  prezada ${nome} ${sobrenome} nascida em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu CPF está ${fcpfStatus}, porém e o seu E-mail está ${fmailStatus}!`;
        }else{
            res.innerText = `Olá,  prezada ${nome} ${sobrenome} nascida em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail está ${fmailStatus}, porém e o seu CPF está ${fcpfStatus}!`;
        }
    }
  } else if (pron == 'masculino') {
    if(fcpfStatus=='válido' && fmailStatus=='válido'){
        res.innerText = `Olá,  prezado ${nome} ${sobrenome} nascido em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail e CPF estão válidos!`;
    } else if(fcpfStatus=='inválido' && fmailStatus=='inválido'){
        res.innerText = `Olá,  prezado ${nome} ${sobrenome} nascido em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail e CPF estão inválidos!`;
    }else{
        if(fcpfStatus=='válido' && fmailStatus=='inválido'){
            res.innerText = `Olá,  prezado ${nome} ${sobrenome} nascido em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu CPF está ${fcpfStatus}, porém e o seu E-mail está ${fmailStatus}!`;
        }else{
            res.innerText = `Olá,  prezado ${nome} ${sobrenome} nascido em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail está ${fmailStatus}, porém e o seu CPF está ${fcpfStatus}!`;
        }
    }
  } else if (pron == 'não-binário') { //ver isso ????
    if(fcpfStatus=='válido' && fmailStatus=='válido'){
        res.innerText = `Olá,  prezade ${nome} ${sobrenome} nascide em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail e CPF estão válidos!`;
    } else if(fcpfStatus=='inválido' && fmailStatus=='inválido'){
        res.innerText = `Olá,  prezade ${nome} ${sobrenome} nascide em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail e CPF estão inválidos!`;
    }else{
        if(fcpfStatus=='válido' && fmailStatus=='inválido'){
            res.innerText = `Olá,  prezade ${nome} ${sobrenome} nascide em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu CPF está ${fcpfStatus}, porém e o seu E-mail está ${fmailStatus}!`;
        }else{
            res.innerText = `Olá,  prezade ${nome} ${sobrenome} nascide em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail está ${fmailStatus}, porém e o seu CPF está ${fcpfStatus}!`;
        }
    }
  } else {
    if(fcpfStatus=='válido' && fmailStatus=='válido'){
        res.innerText = `Olá,  prezado(a) ${nome} ${sobrenome} nascido(a) em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail e CPF estão válidos!`;
    } else if(fcpfStatus=='inválido' && fmailStatus=='inválido'){
        res.innerText = `Olá,  prezado(a) ${nome} ${sobrenome} nascido(a) em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail e CPF estão inválidos!`;
    }else{
        if(fcpfStatus=='válido' && fmailStatus=='inválido'){
            res.innerText = `Olá,  prezado(a) ${nome} ${sobrenome} nascido(a) em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu CPF está ${fcpfStatus}, porém e o seu E-mail está ${fmailStatus}!`;
        }else{
            res.innerText = `Olá,  prezado(a) ${nome} ${sobrenome} nascido(a) em ${nascimento}, e com telefone ${tel}, residente atualmente em ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, informamos que o seu E-mail está ${fmailStatus}, porém e o seu CPF está ${fcpfStatus}!`;
        }
    }
}
}


async function verificar() {
  var nome = document.getElementById('txtnome').value;
  var sobrenome=document.getElementById('txtsobrenome').value;
  var email = document.getElementById('email').value;
  var cpf = document.getElementById('cpf').value;
  var nascimento = document.getElementById('dataNascimento').value;
  nascimento = formatarData(nascimento);
  var tel = document.getElementById('telefone').value;
  tel = formatarTelefone(tel);
  var res = document.getElementById('res');
  var pron = document.getElementById('pronomes').value;
  console.log(pron);
  var cep = document.getElementById('cep').value;

  // Verificar se algum campo está vazio
    if (!nome.trim() || !email.trim() || !cpf.trim() || !nascimento.trim() || !tel.trim() || !pron.trim() || !cep.trim()) {
        alert('Por favor, preencha todos os campos antes de verificar.');
        return;
    }

    // Validar o CPF e o e-mail
    var cpfValido = validarCPF(cpf);
    var emailValido = validarEmail(email);

    // Preencher o endereço a partir do CEP
    var endereco = await preencherEndereco(cep);

    if (endereco) {
        respostas(nome, sobrenome, email, cpf, nascimento, tel, res, pron, endereco);
    }
}
    
// Referência para o ícone de ajuda
var icon = document.querySelector('.help-icon');

// Referência para o balão de mensagem
var balloon = document.querySelector('.balao-mensagem');


icon.addEventListener('click', function() {
  // Exibe o balão de mensagem
  balloon.style.display = 'block';

  // Oculta o balão de mensagem após 3 segundos (3000 milissegundos)
  setTimeout(function() {
    balloon.style.display = 'none';
  }, 3000);
});