import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import { Container, Content, Button, Section, Form } from './styles';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('ongs', {
      headers: {
        Authorization: ongId,
      }
    }).then(
      response => {
        const ong = response.data.find(ong => ong.id === ongId);
        console.log(ong);
        setUsername(ong.name);
        setWhatsapp(ong.whatsapp);
        setEmail(ong.email);
        setCity(ong.city);
        setUf(ong.uf);
      }
    )
  }, [ongId]);

  const history = useHistory();

  async function handleEdit(e) {
    e.preventDefault();

    const data = {
      username,
      email,
      whatsapp,
      city,
      uf,
    }

    try {
      const response = await api.put('profile/edit', data, {
        headers: {
          Authorization: ongId,
        }
      });
      console.log(response);

      alert(`Dados editados com sucesso, ${response.data.name}!`);
      history.push('/');
    }
    catch(err) {
      alert('Erro na edição de dados. Tente novamente.')
    }
    alert(ongId);
  }
  
  return (
    <Container className="new-incident-container">
      <Content className="content">
        <Section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Editar Perfil</h1>
          <p>Edite suas informações
            e mantenha contato com seus heróis.
          </p>

          <Link to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </Section>

        <Form onSubmit={handleEdit}>
          <input 
           placeholder={username}
           value={username}
           onChange={e => setUsername(e.target.value)}
          />

          <input
           placeholder={email} type="email"
           value={email}
           onChange={e => setEmail(e.target.value)} 
          />

          <input 
           placeholder={whatsapp}
           value={whatsapp}
           onChange={e => setWhatsapp(e.target.value)} 
          />

          <div>
            <input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Cidade"
            />
            <input
              value={uf}
              onChange={e => setUf(e.target.value)}
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>

          <Button type="submit">
            Editar
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
