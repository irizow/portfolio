import styles from './projects.module.css'
import weatherIcon from '../../assets/images/weather.png'
import cvIcon from '../../assets/images/cvgen.png'
import storeIcon from '../../assets/images/store.png'
import terminalIcon from '../../assets/images/terminal.png'
import limeLogo from '../../assets/images/limelogo.png'

export default function Projects() {

    const projects = [
        {title: 'Weather App',
        href: 'https://irizow.github.io/weather-app',
        icon: weatherIcon,
        alt: 'Weather app icon',
        },
        {title: 'Vape Store',
        href: 'https://vape-store-delta.vercel.app/',
        icon: storeIcon,
        alt: 'Store Icon',
        },
        {title: 'CV Generator',
        href: 'https://cv-generator-puce-iota.vercel.app/',
        icon: cvIcon,
        alt: 'Cv generator icon',
            },
        {title: 'Built by Lime',
        href: 'https://builtbylime.com',
        icon: limeLogo,
        alt: 'Built by lime logo',
            },
    ]

    function Project({href, icon, alt, title}) {
        return (
            <div className={styles.projboxes}>
                <a href={href} target='_blank' rel='noopener noreferrer'>
                    <img src={icon} alt={alt}></img>
                    <span>{title}</span>
                </a>
            </div>
        )

    }
    return (
        <div className={styles.container}>
           {projects.map((project, index) =>
        <Project key={index} title={project.title} alt={project.alt} icon={project.icon} href={project.href} />)}
            
        </div>
    )
}