export default function Contact() {
  const contactLinks = {
    'linkedIn': 'https://www.linkedin.com/in/yannickliebnau/',
    'Github': 'https://github.com/YanLieb',
    'Mail': 'mailto:contact@yannickliebnau.com'
  }

  return (
    <div className="contact" >
      <div className="contact__container h-screen container flex flex-col items-center">
        <div className="contact__links flex flex-col items-center justify-center h-full">
          {contactLinks && Object.entries(contactLinks).map(([name, link]) => (
            <div className="contact__link" key={name}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            </div>
          ))}
        </div>
        <div className="contact__copyright">
          <p>© 2025 Yannick Liebnau. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}