import '../App.css'
import '@mantine/core/styles.css';
import { MainLayout } from '../components/MainLayout';

const text1 =  `
Not sure about what you're seeing? Most of us have an intuitive sense about at least some AI images. There’s an uncanny valley effect - for now.
But sometimes it's not so obvious. When in doubt, there's a few common giveaways to look out for.
`

const list1 = <ul style={{ listStyleType: 'disc', textAlign: 'left' }}>

<li><strong>Unnatural Hands and Fingers:</strong> too many/too few fingers, distorted or awkwardly positioned digits and limbs - humans and AI both have a lot of trouble with drawing hands</li>
<li><strong>Uncanny Faces:</strong> overly smooth skin with no imperfections, teeth that melt together, "spooky" eyes</li>
<li><strong>Lack of Depth and Texture:</strong> flat or uniform backgrounds or gradients that shouldn't exist with real lighting</li>
<li><strong>Perspective Issues:</strong> strange proportions and perspectives - if it looks like an Escher painting on close examination, it probably isn't a photograph</li>
<li><strong>Overly Uniform Lighting:</strong> Unnatural lighting, "off" shadows or no shadows</li>
<li><strong>Garbled Text:</strong> Text renders badly or is unreadable. Be careful with this one; a lot of phones attempt to make images better algorithmically </li>
</ul>


export const TipsPage = () => {
  
  return (
    <MainLayout>
      <h1>Identifying AI-Generated Images</h1>
        <p>{text1}</p>
        <p>Keep in mind that phone cameras use AI to improve images, so real photographs will sometimes have some of the same problems as AI-generated images.</p>
        {list1}
    </MainLayout>
  )
};
