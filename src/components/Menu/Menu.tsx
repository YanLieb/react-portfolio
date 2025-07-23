interface MenuComponentProps {
  ulClasses?: string;
  liClasses?: string;
}

export default function Menu({ ulClasses = "", liClasses = "" }: MenuComponentProps) {
  return (
    <>
      <ul className={ulClasses}>
        {
          ["Projects", "About", "Contact"].map((entry, key) => (
            <li className={`menu-entry menu-entry-${key + 1} text-xl ${liClasses}`} key={key}>{entry}</li>
          ))
        }
      </ul>
    </>
  )
}