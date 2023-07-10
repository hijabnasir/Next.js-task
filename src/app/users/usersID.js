import Image from 'next/image';

const UserComponent = () => {
  // Assume you have the user's website and image album data
  const website = 'https://example.com';
  const imageAlbum = [
    '/albums/photo1.jpg',
    '/albums/photo2.jpg',
    '/albums/photo3.jpg',
  ];

  return (
    <div>
      <h1>User Component</h1>
      <Image src="/avatars/user-avatar.png" alt="User Avatar" width={200} height={200} />

      <h2>Website: <a href={website}>{website}</a></h2>

      <h2>Image Album:</h2>
      <div>
        {imageAlbum.map((image, index) => (
          <div key={index}>
            <Image src={image} alt={`Photo ${index + 1}`} width={300} height={200} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserComponent;
