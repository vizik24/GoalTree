import { Link } from "react-router-dom"

export function Footer({ sections = [], socialLinks, copyright }) {
  return (
    <footer className="bg-base-200 text-base-content py-12 mt-4">
  <div className="container mx-auto px-4">
    {sections.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8 justify-center text-center">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
    <div className="flex justify-center space-x-4 mb-8">
      {socialLinks.map((social, index) => (
        <Link key={index} href={social.href} className="hover:text-primary" aria-label={social.label}>
          <social.icon className="w-6 h-6" />
        </Link>
      ))}
    </div>
    <div className="text-center text-base-content">
      <p>{copyright}</p>
    </div>
  </div>
</footer>

  )
}

