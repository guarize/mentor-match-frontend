import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import { useRouter } from 'next/router';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [matches, setMatches] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/me');
        console.log(response.data);
        setUserId(response.data.id);
        fetchMatches(response.data.id);

        return response.data
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const meUser = await fetchCurrentUser();

        const response = await axios.get('http://localhost:3000/profiles');

        setUsers(response.data.profiles?.filter((user) => user?.user?.role !== meUser?.role));
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    const fetchMatches = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:3000/matches?userId=${userId}`);
        setMatches(response.data.matches.map(match => match.userId2));
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchCurrentUser();
    fetchUsers();
  }, [router]);

  const handleMatch = async (userId2) => {
    try {
      await axios.post('http://localhost:3000/matches', {
        userId1: userId,
        userId2,
        status: 'PENDING',
      });
      setMatches([...matches, userId2]);
      alert('Match solicitado!');
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Usuários</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onMatch={handleMatch}
              matched={matches.includes(user.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
