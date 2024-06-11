import md5 from 'md5';

export default function UserCard({ user, onMatch, matched }) {
  const avatarUrl = `https://www.gravatar.com/avatar/${md5(user.user.email)}?d=identicon`;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <div className="flex items-start p-6">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4 flex-1 h-32">
          <h2 className="text-xl font-semibold text-gray-900">{user.user.name}</h2>
          <p className="text-gray-600">{user.bio}</p>
          <p className="text-gray-600">{user.interests}</p>
          <p className="text-gray-600">{user.experience}</p>
        </div>
      </div>
      <div className="flex justify-end p-6 border-t">
        {matched ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow cursor-not-allowed"
            disabled
          >
            Match Feito
          </button>
        ) : (
          <button
            onClick={() => onMatch(user.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Match
          </button>
        )}
      </div>
    </div>
  );
}
