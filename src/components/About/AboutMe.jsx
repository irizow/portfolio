import styles from './about.module.css'
import avatar from '../../assets/images/Iris.png'

export default function AboutMe({language}) {

    const text1 = language === "English" ? "About Me" : "Sobre Mi";
    const paragraph1 = language === "English" ? "Hey there! I'm Iris, a 26-year-old Full Stack Developer who stumbled into coding after a whirlwind romance with travel." :
                                    language === "Spanish" ? "¡Hola! Soy Iris, una Desarrolladora Full Stack de 26 años que se adentró en el mundo de la programación después de una apasionante historia de amor con los viajes." :
                                    "Hola! Sóc l'Iris, una desenvolupadora Full Stack de 26 anys que va descobrir la programació després d'una història apassionant amb els viatges.";
    const paragraph2 = language === "English" ? "I spent my early to mid twenties hopping from country to country. I lived in Japan, high-fived kangaroos in Australia, and backpacked through Europe, Asia and volunteered with wild animals in South Africa. Life was one big adventure until my girlfriend started studying web development and decided to see what all the fuss was about... and I got hooked!!!" :
                                    language === "Spanish" ? "Durante mis primeros veinte, viajé de país en país. Viví en Japón, saludé a los canguros en Australia, recorrí Europa y Asia, y trabajé como voluntaria con animales salvajes en Sudáfrica. La vida era una aventura constante hasta que mi novia empezó a estudiar desarrollo web, decidí probar... ¡y me enganché!" :
                                    "Durant els meus vint anys, vaig viatjar per diversos països. Vaig viure al Japó, vaig conèixer els cangurs a Austràlia, vaig recórrer Europa i Àsia, i vaig treballar com a voluntària amb animals salvatges a Sud-àfrica. La vida era una aventura constant fins que la meva parella va començar a estudiar desenvolupament web, vaig decidir probar... i em vaig enganxar!"
    const paragraph3 = language === "English" ? "Before I fell for web dev, I studied Fine Arts and Marketing. They were cool and all, but nothing clicked quite like coding, and I feel that the skills I learned on those two degrees combine quite well with web dev." :
                                    language === "Spanish" ? "Antes de enamorarme del desarrollo web, estudié Bellas Artes y Marketing. Eran interesantes, pero nada me atrapó como la programación, y creo que las habilidades que adquirí en esos dos campos se complementan perfectamente con el desarrollo web." :
                                            "Abans d'enamorar-me del desenvolupament web, vaig estudiar Belles Arts i Màrqueting. Eren interessants, però res em va captivar com la programació, i crec que les habilitats que vaig adquirir en aquests dos àmbits es complementen perfectament amb el desenvolupament web."
    const paragraph4 = language === "English" ? "When I'm not on my laptop or out and about travelling, you can find me immersed in video games, playing guitar, or trying to hit some high notes at karaoke." :
                                    language === "Spanish" ? "Cuando no estoy frente a mi computadora o explorando el mundo, me encontrarás sumergida en videojuegos, tocando la guitarra o intentando alcanzar notas altas en el karaoke." :
                                    "Quan no estic davant del meu ordinador o explorant el món, em trobaràs immersa en videojocs, tocant la guitarra o intentant ser una estrella al karaoke.";
    const paragraph5 = language === "English" ? "Take a look around my portfolio to see what I’ve been up to. If you’re into creating awesome stuff and having a laugh along the way, let’s chat!" :
                                    language === "Spanish" ? "Visita mi portfolio para conocer más sobre mis proyectos. Si te apasiona crear cosas increíbles y divertirte en el proceso, ¡hablemos!" :
                                    "Visita el meu portfolio per conèixer més sobre els meus projectes. Si t'apassiona crear coses increïbles i divertir-te en el procés, parlem!"
    return (
        <div className={styles.aboutcontainer}>
        <h1>{text1}</h1>
        <div className={styles.contentwrapper}>
            <div className={styles.about}>
                <p>{paragraph1}.</p>
                <p>{paragraph2}</p>
                <p>{paragraph3}</p>
                <p>{paragraph4} </p>
                <p>{paragraph5}</p> 
            </div>
            <img className={styles.avatar} src={avatar} alt="avatar of a cat using a laptop"></img>
        </div>
        </div>
    )
}