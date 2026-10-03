import { useParams } from 'react-router-dom'
import { CONTACT_CONFIG } from '../config/contact'
import { plantes, pots, soins, oiseaux, bouquets } from '../constants/products'
import { Product } from '../types'
import Navbar from '../components/Navbar'
import ContactFooter from '../components/ContactFooter'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'

export default function ProductPage() {
  const { productSlug } = useParams<{ productSlug: string }>()
  
  // Find product in all categories
  const allProducts = [...plantes, ...pots, ...soins, ...oiseaux, ...bouquets]
  const product = allProducts.find(p => p.slug === productSlug || p.id === productSlug)
  
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  // Redirect Monstera to its specific page
  useEffect(() => {
    if (productSlug === 'monstera-deliciosa' || productSlug === 'plant1') {
      window.location.href = '/plantes/monstera-deliciosa'
    }
  }, [productSlug])

  // Get viewed products from localStorage and mark current as viewed
  useEffect(() => {
    if (!product) return

    // Get viewed products
    const viewed = JSON.parse(localStorage.getItem('viewedProducts') || '[]')
    
    // Add current product to viewed if not already there
    if (!viewed.includes(product.id)) {
      viewed.push(product.id)
      localStorage.setItem('viewedProducts', JSON.stringify(viewed))
    }

    // Get random products from same category excluding current and previously viewed
    const categoryProducts = allProducts.filter(p => p.category === product.category)
    const available = categoryProducts.filter(p => p.id !== product.id && !viewed.includes(p.id))
    
    // If not enough available, use all except current from same category
    const pool = available.length >= 4 ? available : categoryProducts.filter(p => p.id !== product.id)
    
    // Shuffle and take 4
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    setRelatedProducts(shuffled.slice(0, 4))
  }, [product])

  // Scroll to top on mount and when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [productSlug])

  if (!product) return null

  // Parse description to extract attributes
  const parseDescription = (desc: string) => {
    const parts = desc.split(' | ')
    const attributes: Record<string, string> = {}
    parts.forEach(part => {
      const [key, value] = part.split(': ')
      if (key && value) {
        attributes[key] = value
      }
    })
    return attributes
  }

  const attributes = parseDescription(product.description)

  const handleWhatsAppClick = () => {
    const message = `Bonjour, je souhaite avoir plus d'informations sur ${product.title}.`
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleRelatedProductClick = (relatedProduct: Product) => {
    const slug = relatedProduct.slug || relatedProduct.id
    window.location.href = `/${relatedProduct.category}/${slug}`
  }

  const handleRelatedProductWhatsApp = (e: React.MouseEvent, relatedProduct: Product) => {
    e.stopPropagation()
    const message = `Bonjour, je suis intéressé(e) par: ${relatedProduct.title} - Prix: ${relatedProduct.price}`
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    })
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 2000)
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  // Generate description text based on product type
  const getDescriptionText = () => {
    // Plants
    if (product.id === 'plant1') {
      return "Le Monstera Deliciosa, surnommé \"plante fromage\" en raison de ses fruits comestibles, est une plante tropicale d'intérieur originaire d'Amérique Centrale. Appréciée pour ses grandes feuilles perforées en forme de cœur, elle apporte une touche exotique et élégante à tout espace de vie. Cette plante grimpante peut atteindre une hauteur de 60 à 150 cm et prospère dans une lumière indirecte. Facile d'entretien, elle nécessite un arrosage hebdomadaire modéré et apprécie que l'on vaporise régulièrement ses feuilles pour maintenir une humidité optimale."
    }
    if (product.id === 'plant2') {
      return "Le Ficus Lyrata, ou Figuier à feuilles de lyre, est un arbre d'intérieur tropical originaire d'Afrique de l'Ouest. Réputé pour ses grandes feuilles en forme de lyre avec des lobes distinctifs, il ajoute une touche architecturale et moderne à tout intérieur. Cette plante élégante peut atteindre 100 à 200 cm de hauteur et préfère une lumière vive mais indirecte. Elle nécessite un arrosage modéré toutes les 1 à 2 semaines et apprécie que l'on tourne régulièrement le pot pour une croissance uniforme."
    }
    if (product.id === 'plant3') {
      return "Le Laurier Rose est un arbuste méditerranéen à fleurs originaire du bassin méditerranéen. Célèbre pour ses fleurs spectaculaires qui peuvent être roses, rouges, blanches ou jaunes, il fleurit abondamment tout l'été. Cette plante robuste peut atteindre 150 à 250 cm de hauteur et s'épanouit en plein soleil. Elle nécessite un arrosage régulier modéré et une taille après la floraison pour encourager une nouvelle croissance et maintenir une forme harmonieuse."
    }
    if (product.id === 'plant4') {
      return "Le Palmier Nain est un palmier tropical compact originaire de la région méditerranéenne. Avec son tronc élégant et ses feuilles en éventail gracieuses, il apporte une ambiance exotique aux jardins et terrasses. Ce palmier nain atteint généralement 100 à 180 cm de hauteur et prospère en plein soleil. Il nécessite un arrosage modéré à régulier et apprécie d'être protégé des vents forts pour préserver la beauté de son feuillage."
    }
    if (product.id === 'plant5') {
      return "L'Hibiscus est un arbuste à fleurs tropicales originaire d'Asie du Sud-Est. Connu pour ses fleurs spectaculaires aux couleurs vives allant du rouge au jaune en passant par le rose et le blanc, il illumine tout jardin ou espace extérieur. Cette plante florifère peut atteindre 80 à 150 cm de hauteur et s'épanouit en plein soleil. Elle nécessite un arrosage régulier modéré et apprécie une fertilisation pendant la période de floraison pour encourager une production abondante de fleurs."
    }
    if (product.id === 'plant6') {
      return "Le Pothos Doré est une plante grimpante tropicale originaire de Polynésie. Appréciée pour ses feuilles heart-shaped marquées de taches dorées, elle est idéale pour suspendre ou laisser grimper sur un support. Cette plante versatile peut atteindre 30 à 100 cm de longueur et tolère une large gamme de conditions lumineuses, de l'ombre à la lumière indirecte. Elle nécessite un arrosage léger hebdomadaire et apprécie que l'on nettoie régulièrement ses feuilles pour enlever la poussière."
    }
    if (product.id === 'plant7') {
      return "Le Lotus Sacré est une plante aquatique vénérée originaire d'Asie. Célèbre pour ses fleurs majestueuses qui s'ouvrent le matin et se ferment le soir, il symbolise la pureté et l'illumination spirituelle dans de nombreuses cultures. Cette plante aquatique peut atteindre 50 à 100 cm de hauteur et nécessite un ensoleillement complet pour fleurir abondamment. Elle doit être plantée dans un vase profond avec de l'eau stagnante et apprécie un substrat riche en nutriments."
    }
    if (product.id === 'plant8') {
      return "Le Bambou Sacré est un bambou à croissance rapide originaire d'Asie. Réputé pour sa robustesse et sa symbolique de chance et de prospérité, il est largement utilisé dans les jardins et les espaces extérieurs. Ce bambou imposant peut atteindre 200 à 400 cm de hauteur et s'adapte à diverses conditions, du plein soleil à la mi-ombre. Il nécessite un arrosage régulier abondant et un contrôle vigilant de ses racines pour éviter qu'il ne devienne envahissant."
    }
    if (product.id === 'plant9') {
      return "Le Rosier Grimpant est un rosier à fleurs originaire d'Europe. Connu pour ses tiges grimpantes qui peuvent atteindre 200 à 300 cm de hauteur, il est parfait pour décorer clôtures, pergolas et murs. Ses fleurs parfumées et colorées fleurissent généreusement tout l'été. Ce rosier robuste nécessite un arrosage régulier modéré et une taille en fin d'hiver pour encourager une nouvelle croissance et une floraison abondante au printemps suivant."
    }
    // Pots
    if (product.id === 'pot1') {
      return "Le Pot Artisanal est un chef-d'œuvre de la poterie marocaine traditionnelle, façonné à la main par des artisans locaux. En terre cuite brute, ce pot allie l'authenticité artisanale à une robustesse exceptionnelle. Ses dimensions de 25 cm de hauteur et 25 cm de diamètre en font le choix idéal pour les plantes d'intérieur et d'extérieur de taille moyenne. La terre cuite offre une excellente aération du substrat, favorisant une croissance saine des racines, tout en apportant une touche chaleureuse et naturelle à votre décoration."
    }
    if (product.id === 'pot2') {
      return "La Jardinière Moderne est une pièce de design contemporain qui marque par ses lignes épurées et sa céramique émaillée de haute qualité. Avec ses dimensions de 40 cm de long, 20 cm de large et 15 cm de hauteur, elle offre un espace généreux pour créer des compositions florales spectaculaires. Son style moderne s'intègre parfaitement dans les intérieurs minimalistes et les balcons urbains, apportant une note d'élégance sophistiquée à tout espace de vie."
    }
    if (product.id === 'pot3') {
      return "Le Pot Macramé est une création bohème chic qui combine l'artisanat traditionnel du macramé avec une esthétique moderne. Suspendu à 60 cm de hauteur avec un pot intérieur de 15 cm de diamètre, il crée un effet vertical spectaculaire, parfait pour les plantes retombantes comme le Pothos ou le Philodendron. Tissé à la main avec de la corde de coton naturelle, il ajoute une texture organique et chaleureuse à tout intérieur, tout en libérant de l'espace au sol."
    }
    if (product.id === 'pot4') {
      return "Le Cube Béton est une pièce de design industriel minimaliste qui impressionne par sa forme géométrique parfaite et sa texture brute. Avec ses dimensions de 20 cm cube, il est idéal pour les plantes modernes et les succulentes. Le béton léger offre une stabilité exceptionnelle tout en restant facile à déplacer. Son style industriel s'harmonise avec les intérieurs loft et les espaces contemporains, créant un contraste saisissant avec le vert luxuriant des plantes."
    }
    if (product.id === 'pot5') {
      return "Le Bac en Bois est une jardinière rustique naturelle qui évoque les traditions jardinères du passé. Fabriqué en bois traité pour résister aux éléments, il mesure 60 cm de long, 30 cm de large et 25 cm de hauteur, offrant un espace généreux pour créer des compositions florales impressionnantes. Son style rustique et chaleureux s'intègre parfaitement aux terrasses, balcons et jardins, apportant une touche d'authenticité et de naturel à tout espace extérieur."
    }
    if (product.id === 'pot6') {
      return "Le Pot Zellige est une œuvre d'art marocaine traditionnelle qui sublime chaque plante par son décor en zellige émaillé. Avec ses 30 cm de hauteur et 25 cm de diamètre, il offre un espace généreux pour les plantes décoratives de taille moyenne. Les motifs en zellige, réalisés à la main par des artisans marocains, créent des reflets lumineux subtils qui donnent vie à chaque pot. C'est le choix parfait pour ceux qui recherchent une touche d'élégance orientale authentique."
    }
    if (product.id === 'pot7') {
      return "Le Pot Éco est la solution idéale pour les jardiniers soucieux de l'environnement. Fabriqué à partir de plastique 100% recyclé, il allie durabilité et responsabilité écologique. Avec ses 20 cm de hauteur et 18 cm de diamètre, il convient parfaitement aux plantes d'intérieur de petite à moyenne taille. Son style éco-responsable moderne s'intègre harmonieusement dans tous les intérieurs contemporains, tout en offrant l'avantage d'être léger et facile à nettoyer."
    }
    if (product.id === 'pot8') {
      return "La Vasque Décorative est une pièce de prestige taillée dans la pierre naturelle, conçue pour les entrées et les espaces extérieurs haut de gamme. Avec ses dimensions impressionnantes de 80 cm de long, 40 cm de large et 15 cm de hauteur, elle crée un impact visuel spectaculaire. La pierre naturelle offre une durabilité exceptionnelle et une texture organique qui vieillit avec grâce, développant une patine unique au fil du temps. C'est le choix parfait pour les projets d'aménagement paysager de luxe."
    }
    if (product.id === 'pot9') {
      return "Le Cache-pot Zinc est une élégance campagne chic qui sublime toute plante par son esthétique vieilli soigneusement. Avec ses 25 cm de hauteur et 22 cm de diamètre, il convient aux plantes de taille moyenne. Le zinc vieilli développe une patine grise aristocratique qui évolue gracieusement au fil du temps, donnant à chaque pot un caractère unique. Son style campagne chic apporte une touche de sophistication rustique aux intérieurs et aux espaces extérieurs, parfait pour mettre en valeur vos plantes préférées."
    }
    // Soins
    if (product.id === 'med1') {
      return "L'Engrais Bio est un engrais organique liquide de haute qualité conçu pour nourrir vos plantes de manière naturelle et durable. Formulé avec un équilibre NPK 5-3-7, il favorise une croissance équilibrée : l'azote stimule le feuillage, le phosphore encourage les racines et la floraison, et le potassium renforce la résistance aux maladies. Sa formule liquide permet une absorption rapide par les plantes, garantissant des résultats visibles en quelques semaines. Sans produits chimiques synthétiques, il est sûr pour l'environnement et les animaux domestiques."
    }
    if (product.id === 'med2') {
      return "Les Traitements Anti-parasites sont une solution biologique et écologique pour protéger vos plantes des nuisibles. Formulés à base d'huiles essentielles naturelles, ils éliminent efficacement pucerons, cochenilles, araignées rouges et autres parasites sans nuire à l'environnement. Contrairement aux pesticides chimiques, ce traitement bio est sans danger pour les pollinisateurs, les animaux domestiques et les humains. Son action pulvérisable permet une application précise sur les zones affectées, avec une protection durable jusqu'à 4 mois."
    }
    if (product.id === 'med3') {
      return "Les Substrats Spéciaux sont un terreau professionnel formulé pour répondre aux besoins spécifiques de différentes catégories de plantes. Composé d'un mélange équilibré de tourbe, perlite et écorce, il offre la combinaison parfaite de rétention d'humidité et de drainage aéré. La tourbe retient l'eau et les nutriments, la perlite améliore l'aération et empêche le compactage, et l'écorce ajoute de la structure et libère progressivement des nutriments. Ce substrat est idéal pour le rempotage et garantit une croissance saine et vigoureuse."
    }
    // Oiseaux
    if (product.id === 'bird1') {
      return "Le Perroquet Vert est un oiseau exotique fascinant, réputé pour son intelligence exceptionnelle et sa capacité à imiter la parole humaine. Originaire des forêts tropicales d'Amérique du Sud, ce perroquet amazone à bec fort peut atteindre 30 à 35 cm de longueur. Son plumage vert émeraude contraste magnifiquement avec des touches de jaune sur le front et les ailes. Ces oiseaux sont extrêmement sociaux et peuvent vivre jusqu'à 50 ans en captivité. Ils nécessitent une stimulation mentale constante, une alimentation variée et beaucoup d'interaction humaine pour s'épanouir."
    }
    if (product.id === 'bird2') {
      return "Le Canari Mélodieux est un petit oiseau chanteur originaire des îles Canaries, célèbre pour son chant exceptionnellement mélodieux. Avec ses 12 à 13 cm de longueur et son plumage jaune vif, c'est un compagnon idéal pour les amateurs d'oiseaux. Les mâles sont particulièrement réputés pour leur chant complexe et varié, utilisé historiquement dans les mines pour détecter les gaz toxiques. Ces oiseaux sont relativement faciles à entretenir, nécessitant une cage spacieuse, une alimentation riche en graines et une exposition modérée à la lumière naturelle pour encourager le chant."
    }
    // Bouquets
    if (product.category === 'bouquets') {
      return "Nos bouquets sont composés de fleurs fraîches sélectionnées avec soin pour créer des arrangements floraux d'exception. Chaque bouquet est assemblé à la main par nos fleuristes expérimentés, combinant les fleurs les plus belles selon leur saison, leur couleur et leur symbolique. Que ce soit pour une occasion spéciale ou simplement pour apporter de la joie au quotidien, nos bouquets offrent une explosion de couleurs et de parfums qui transformeront n'importe quel espace. Livrés dans notre emballage de protection, ils arrivent prêts à émerveiller."
    }
    return product.description
  }

  // Generate care tips based on product type
  const getCareTips = () => {
    // Plants
    if (product.id === 'plant1') {
      return "Pour garder votre Monstera en bonne santé, vaporisez régulièrement ses feuilles pour maintenir une humidité optimale, surtout en intérieur sec. Nettoyez les feuilles avec un chiffon humide pour enlever la poussière et permettre à la plante de mieux respirer. Arrosez modérément une fois par semaine, en laissant le substrat sécher légèrement entre deux arrosages. Évitez l'eau stagnante dans le soucoupe et fertilisez légèrement au printemps et en été pour encourager une croissance vigoureuse."
    }
    if (product.id === 'plant2') {
      return "Pour maintenir votre Ficus Lyrata en bonne santé, placez-le dans un endroit lumineux mais sans soleil direct. Arrosez modérément toutes les 1 à 2 semaines, en laissant le sol sécher légèrement entre les arrosages. Tournez le pot régulièrement d'un quart de tour pour assurer une croissance uniforme du feuillage. Vaporisez les feuilles régulièrement pour maintenir l'humidité et nettoyez-les avec un chiffon humide pour enlever la poussière. Fertilisez légèrement au printemps et en été."
    }
    if (product.id === 'plant3') {
      return "Pour votre Laurier Rose, assurez-vous de le planter dans un sol bien drainé et en plein soleil. Arrosez régulièrement mais modérément, en augmentant la fréquence pendant les périodes chaudes. Taillez la plante après la floraison pour encourager une nouvelle croissance et maintenir une forme compacte. Protégez-la des températures inférieures à 5°C et fertilisez au printemps avec un engrais riche en potassium pour stimuler la floraison."
    }
    if (product.id === 'plant4') {
      return "Pour votre Palmier Nain, plantez-le dans un sol bien drainé et ensoleillé. Arrosez modérément à régulièrement, en augmentant la fréquence pendant les périodes de chaleur intense. Protégez-le des vents forts qui peuvent endommager les feuilles. Fertilisez au printemps et en été avec un engrais équilibré pour palmiers. Retirez les feuilles mortes ou endommagées régulièrement pour maintenir la plante en bonne santé et esthétique."
    }
    if (product.id === 'plant5') {
      return "Pour votre Hibiscus, plantez-le dans un sol riche et bien drainé en plein soleil. Arrosez régulièrement et modérément, en maintenant le sol humide mais pas détrempé. Fertilisez généreusement pendant la période de floraison avec un engrais riche en phosphore pour encourager une production abondante de fleurs. Taillez légèrement au printemps pour stimuler une nouvelle croissance et retirez les fleurs fanées pour prolonger la floraison."
    }
    if (product.id === 'plant6') {
      return "Pour votre Pothos Doré, placez-le dans un endroit avec lumière indirecte brillante ou mi-ombre. Arrosez légèrement une fois par semaine, en laissant le sol sécher légèrement entre les arrosages. Vaporisez les feuilles régulièrement pour maintenir l'humidité et nettoyez-les avec un chiffon humide pour enlever la poussière. Vous pouvez tailler les tiges pour encourager une croissance plus touffue et propager facilement par bouturage dans l'eau."
    }
    if (product.id === 'plant7') {
      return "Pour votre Lotus Sacré, plantez-le dans un vase profond avec un substrat riche en nutriments et placez-le en plein soleil. Maintenez un niveau d'eau constant de 20 à 30 cm au-dessus du substrat. Fertilisez mensuellement pendant la saison de croissance avec un engrais pour plantes aquatiques. Retirez les feuilles et fleurs fanées pour encourager une nouvelle floraison et maintenez une température de l'eau entre 20 et 30°C."
    }
    if (product.id === 'plant8') {
      return "Pour votre Bambou Sacré, plantez-le dans un sol riche et bien drainé en plein soleil ou mi-ombre. Arrosez régulièrement et abondamment, surtout pendant les périodes de croissance active. Installez une barrière rhizome pour contrôler l'expansion des racines et éviter qu'il ne devienne envahissant. Fertilisez au printemps avec un engrais riche en azote et taillez les tiges anciennes pour encourager une nouvelle croissance vigoureuse."
    }
    if (product.id === 'plant9') {
      return "Pour votre Rosier Grimpant, plantez-le dans un sol riche et bien drainé en plein soleil. Arrosez régulièrement et modérément, en dirigeant l'eau vers la base de la plante pour éviter les maladies foliaires. Taillez en fin d'hiver pour éliminer les branches mortes, malades ou croisées et encourager une nouvelle croissance. Fertilisez au printemps avec un engrais pour rosiers et paillez le sol pour conserver l'humidité."
    }
    // Pots
    if (product.id === 'pot1') {
      return "Pour entretenir votre Pot Artisanal en terre cuite, nettoyez-le régulièrement avec un chiffon doux et de l'eau tiède. La terre cuite étant poreuse, elle absorbe l'excès d'humidité mais peut aussi laisser des dépôts minéraux. Faites tremper le pot dans de l'eau vinaigrée une fois par an pour éliminer les dépôts de calcaire. En hiver, protégez le pot du gel en le déplaçant à l'intérieur ou en l'enveloppant dans un matériau isolant. Cette attention prolongera sa beauté et sa durabilité de nombreuses années."
    }
    if (product.id === 'pot2') {
      return "Pour maintenir votre Jardinière Moderne en céramique émaillée, nettoyez-la avec un chiffon doux et de l'eau savonneuse tiède. Évitez les produits abrasifs qui pourraient rayer l'émail. Assurez-vous que le drainage fonctionne correctement en vérifiant que les trous de drainage ne sont pas obstrués. En hiver, videz l'eau stagnante pour éviter que le gel n'endommage la céramique. Un entretien régulier gardera votre jardinière éclatante et protégera vos plantes des maladies racinaires."
    }
    if (product.id === 'pot3') {
      return "Pour entretenir votre Pot Macramé, aspirez régulièrement la poussière accumulée dans les fibres avec un aspirateur à faible puissance. Vous pouvez également le secouiller doucement à l'extérieur pour éliminer la poussière. Si le macramé devient sale, nettoyez-le avec un chiffon humide et laissez-le sécher complètement à l'air. Évitez de mouiller excessivement les cordes car cela pourrait affaiblir le coton. Une fois par an, vérifiez les attaches pour vous assurer qu'elles sont toujours solides."
    }
    if (product.id === 'pot4') {
      return "Pour entretenir votre Cube Béton, nettoyez-le avec un chiffon doux et de l'eau tiède. Le béton étant naturellement poreux, il peut absorber l'humidité et développer des taches d'eau. Appliquez un scellant pour béton une fois par an pour protéger la surface et faciliter le nettoyage. Évitez les produits chimiques agressifs qui pourraient endommager le béton. En hiver, protégez le pot du gel en le déplaçant à l'intérieur ou en le couvrant."
    }
    if (product.id === 'pot5') {
      return "Pour entretenir votre Bac en Bois, appliquez une huile protectrice pour bois extérieur une ou deux fois par an pour nourrir le bois et le protéger des éléments. Inspectez régulièrement le bois pour détecter les signes de pourriture ou de détérioration. En hiver, videz l'eau du bac et couvrez-le pour le protéger de l'humidité excessive. Si vous remarquez des éclats ou des fissures, réparez-les rapidement avec du bois de remplissage pour éviter que l'eau ne pénètre dans le bois."
    }
    if (product.id === 'pot6') {
      return "Pour entretenir votre Pot Zellige, nettoyez les carreaux de zellige avec un chiffon doux et de l'eau tiède. Évitez les produits chimiques agressifs qui pourraient endommager l'émail. Faites attention aux joints entre les carreaux - s'ils se détériorent, réappliquez un coulis de ciment pour sceller. Inspectez régulièrement le pot pour détecter les éclats ou les fissures. Les carreaux de zellige sont durables mais fragiles, manipulez le pot avec précaution lors du déplacement."
    }
    if (product.id === 'pot7') {
      return "Pour entretenir votre Pot Éco en plastique recyclé, nettoyez-le régulièrement avec de l'eau savonneuse tiède et un chiffon doux. Le plastique étant résistant, vous pouvez utiliser une brosse douce pour éliminer les taches tenaces. Assurez-vous que les trous de drainage ne sont pas obstrués pour permettre un bon drainage. En hiver, videz l'eau stagnante pour éviter que le gel n'endommage le pot. Le plastique recyclé est durable mais peut se décolorer avec le temps - une exposition directe au soleil peut accélérer ce processus."
    }
    if (product.id === 'pot8') {
      return "Pour entretenir votre Vasque Décorative en pierre naturelle, nettoyez-la avec de l'eau et une brosse douce. Évitez les produits chimiques agressifs qui pourraient endommager la pierre. Appliquez un scellant pour pierre une fois par an pour protéger la surface des taches et faciliter le nettoyage. En hiver, videz l'eau de la vasque et couvrez-la pour la protéger du gel. La pierre naturelle développe une patine gracieuse avec le temps - appréciez cette évolution naturelle plutôt que d'essayer de la prévenir."
    }
    if (product.id === 'pot9') {
      return "Pour entretenir votre Cache-pot Zinc, laissez la patine naturelle se développer car elle fait partie du charme du zinc vieilli. Si vous préférez une apparence plus brillante, appliquez occasionnellement une cire pour zinc pour protéger la surface. Évitez les produits de nettoyage abrasifs qui pourraient rayer le zinc. Inspectez régulièrement le pot pour détecter les signes de corrosion excessive. Le zinc est naturellement résistant mais peut développer des taches blanches de corrosion - celles-ci peuvent être éliminées avec du vinaigre dilué."
    }
    // Soins
    if (product.id === 'med1') {
      return "Pour utiliser votre Engrais Bio, diluez 1 litre d'engrais dans 10 litres d'eau et appliquez sur le sol autour des plantes, en évitant le contact direct avec les feuilles. Utilisez tous les 15 jours pendant la saison de croissance (printemps et été). Stockez dans un endroit frais et sec, à l'abri de la lumière directe. Portez des gants lors de la manipulation et lavez-vous soigneusement après utilisation. Cet engrais organique est conçu pour une libération lente des nutriments, garantissant une nutrition continue sur 6 mois."
    }
    if (product.id === 'med2') {
      return "Pour appliquer vos Traitements Anti-parasites, pulvérisez uniformément sur les feuilles des plantes, en insistant particulièrement sur le dessous des feuilles où les parasites se cachent souvent. Utilisez au premier signe d'infestation et répétez l'application tous les 7-10 jours si nécessaire. Effectuez le traitement tôt le matin ou tard le soir pour éviter de brûler les feuilles sous le soleil. Évitez l'utilisation pendant la floraison pour protéger les pollinisateurs. Ce traitement bio à base d'huiles essentielles est sûr pour les plantes et l'environnement."
    }
    if (product.id === 'med3') {
      return "Pour utiliser vos Substrats Spéciaux, remplacez le terreau des plantes en pot annuellement, idéalement au printemps avant la période de croissance active. Retirez délicatement la plante de son pot, secouez le vieux terreau des racines et rempotez avec le nouveau substrat. Tassez légèrement le substrat pour éliminer les poches d'air et arrosez modérément après le rempotage. Ce terreau spécialisé, composé de tourbe, perlite et écorce, offre un équilibre parfait de rétention d'humidité et de drainage pour une croissance optimale."
    }
    // Oiseaux
    if (product.id === 'bird1') {
      return "Pour prendre soin de votre Perroquet Vert, fournissez une cage spacieuse d'au moins 80 x 60 x 100 cm avec des perches de différentes tailles et diamètres. Offrez un mélange varié de graines exotiques incluant tournesol, millet et maïs, complété par des fruits et légumes frais. Changez l'eau quotidiennement et nettoyez la cage hebdomadairement. Offrez 10-12 heures de lumière par jour et des jouets pour stimuler son intelligence. Les perroquets sont des animaux sociaux - passez du temps avec lui chaque jour pour éviter l'ennui et les problèmes de comportement."
    }
    if (product.id === 'bird2') {
      return "Pour prendre soin de votre Canari Mélodieux, fournissez une cage d'au moins 60 x 40 x 40 cm avec des perches fines adaptées à ses petits pieds. Offrez un mélange de graines fines riche en alpiste, navette et chènevis, complété par des légumes frais comme carottes et épinards. Changez l'eau quotidiennement et nettoyez la cage régulièrement. Les canaris apprécient 12-14 heures de lumière par jour pour stimuler le chant. Ces oiseaux sont sensibles aux courants d'air - placez la cage dans un endroit protégé et stable."
    }
    // Bouquets
    if (product.category === 'bouquets') {
      return "Pour prolonger la beauté de votre bouquet, coupez les tiges en biais avec des ciseaux propres et placez-les immédiatement dans de l'eau fraîche. Retirez les feuilles qui seraient immergées pour éviter la contamination de l'eau. Changez l'eau tous les 2-3 jours et recoupez les tiges d'environ 2 cm à chaque changement. Placez le bouquet dans un endroit frais, à l'abri du soleil direct et des courants d'air, et évitez de le placer près de fruits mûrirs qui accélèrent le flétrissement. Éloignez-le des radiateurs et climatiseurs."
    }
    return attributes.Conseils || 'Vaporiser les feuilles, nettoyer régulièrement'
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-[72px] md:pt-[72px]">
        {/* Breadcrumb */}
        <div className="px-[4vw] md:px-[6vw] py-4 border-b border-border">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-green-mid">
            <button onClick={() => window.location.href = '/'} className="hover:text-main-green transition-colors">Accueil</button>
            <span className="text-border">/</span>
            <button onClick={() => window.location.href = `/${product.category}`} className="hover:text-main-green transition-colors capitalize">{product.category}</button>
            <span className="text-border">/</span>
            <span className="text-main-green font-medium">{product.title}</span>
          </nav>
        </div>

        {/* Main Product Area */}
        <div className="px-[4vw] md:px-[6vw] py-6 md:py-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Image */}
            <div className="bg-white border border-border rounded-xl p-3 md:p-6 relative">
              <img
                src={product.image}
                alt={product.title}
                loading="eager"
                className="w-full h-auto object-contain max-h-[250px] md:max-h-[500px]"
              />
              <button
                onClick={() => setShowZoom(true)}
                className="absolute bottom-5 right-5 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-main-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
            </div>

            {/* Information */}
            <div className="flex flex-col">
              {product.tag && (
                <div className="text-[10px] md:text-[11px] tracking-[2px] uppercase text-green-mid mb-2">
                  {product.tag}
                </div>
              )}
              <h1 className="font-serif text-xl md:text-3xl font-semibold text-main-green mb-2 md:mb-3">
                {product.title}
              </h1>
              <div className="text-base md:text-xl font-medium text-gold-accent mb-3 md:mb-4">
                {product.price}
              </div>
              
              {/* Short description without attributes */}
              <p className="text-xs md:text-base text-text-mid leading-relaxed mb-4 md:mb-6">
                {product.category === 'plantes' 
                  ? 'Plante d\'intérieur idéale pour décorer votre espace de vie.'
                  : product.category === 'pots'
                  ? 'Contenant décoratif idéal pour mettre en valeur vos plantes.'
                  : product.category === 'soins'
                  ? 'Produit d\'entretien professionnel pour le bien-être de vos plantes.'
                  : product.category === 'oiseaux'
                  ? 'Compagnon à plumes idéal pour égayer votre quotidien.'
                  : 'Arrangement floral exceptionnel pour toutes vos occasions.'
                }
              </p>

              {/* Attributes */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {attributes.Type && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Type:</span> {attributes.Type}</span>
                  </div>
                )}
                {attributes.Origine && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Origine:</span> {attributes.Origine}</span>
                  </div>
                )}
                {attributes.Exposition && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Exposition:</span> {attributes.Exposition}</span>
                  </div>
                )}
                {attributes.Arrosage && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Arrosage:</span> {attributes.Arrosage}</span>
                  </div>
                )}
                {attributes.Taille && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Taille:</span> {attributes.Taille}</span>
                  </div>
                )}
                {attributes.Conseils && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-xs md:text-sm text-text-mid"><span className="font-medium text-main-green">Entretien:</span> {attributes.Conseils}</span>
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-green-mid text-green-mid text-xl md:text-2xl font-bold hover:bg-green-mist transition-colors"
                >
                  −
                </button>
                <span className="text-lg md:text-xl font-semibold text-main-green w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-green-mid text-green-mid text-xl md:text-2xl font-bold hover:bg-green-mist transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="bg-main-green text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:text-main-green hover:shadow-xl transition-all duration-300 shadow-lg w-full md:w-auto"
              >
                Ajouter au panier
              </button>

              {/* Confirmation */}
              {showConfirmation && (
                <div className="mt-3 text-center text-sm text-green-mid animate-fade-in">
                  Ajouté au panier ✓
                </div>
              )}

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsAppClick}
                className="mt-4 bg-white/10 border-2 border-main-green text-main-green px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-[1.5px] uppercase font-medium hover:bg-main-green hover:text-white transition-all duration-300 w-full md:w-auto"
              >
                Demander sur WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-[4vw] md:px-[6vw] py-6 md:py-12 bg-green-mist">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-lg md:text-2xl font-semibold text-main-green mb-3 md:mb-4">
              {product.category === 'plantes' 
                ? 'À propos de cette plante'
                : product.category === 'pots'
                ? 'À propos de ce pot'
                : product.category === 'soins'
                ? 'À propos de ce produit'
                : product.category === 'oiseaux'
                ? 'À propos de cet oiseau'
                : 'À propos de ce bouquet'
              }
            </h2>
            <p className="text-xs md:text-base text-text-mid leading-relaxed">
              {getDescriptionText()}
            </p>
          </div>
        </div>

        {/* Care Tips */}
        <div className="px-[4vw] md:px-[6vw] py-6 md:py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-lg md:text-2xl font-semibold text-main-green mb-4 md:mb-6">
              {product.category === 'plantes' 
                ? 'Conseils d\'entretien'
                : product.category === 'pots'
                ? 'Conseils d\'entretien'
                : product.category === 'soins'
                ? 'Mode d\'emploi'
                : product.category === 'oiseaux'
                ? 'Conseils de soin'
                : 'Conseils de conservation'
              }
            </h2>
            <div className="bg-green-mist border border-green-pale rounded-xl p-4 md:p-8">
              <p className="text-xs md:text-base text-text-mid leading-relaxed">
                {getCareTips()}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="px-[4vw] md:px-[6vw] py-6 md:py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-lg md:text-2xl font-semibold text-main-green mb-4 md:mb-6">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white border border-border overflow-hidden transition-all duration-500 cursor-pointer group rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md md:rounded-2xl md:shadow-md md:hover:-translate-y-3 md:hover:shadow-2xl active:scale-95"
                  onClick={() => handleRelatedProductClick(relatedProduct)}
                >
                  <div className="h-[120px] md:h-[220px] overflow-hidden relative cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-2 md:p-[22px]">
                    {relatedProduct.tag && (
                      <div className="text-[9px] md:text-[10px] tracking-[2px] uppercase text-green-mid mb-1 md:mb-1.5 leading-none font-normal">
                        {relatedProduct.tag}
                      </div>
                    )}
                    <h3 className="font-serif text-xs md:text-xl font-semibold text-main-green mb-1 md:mb-1.5 leading-tight group-hover:text-green-light transition-colors duration-300 line-clamp-2">
                      {relatedProduct.title}
                    </h3>
                    <div className="text-xs md:text-lg font-medium text-gold-accent mb-2 md:mb-3">
                      {relatedProduct.price}
                    </div>
                    <button
                      onClick={(e) => handleRelatedProductWhatsApp(e, relatedProduct)}
                      className="w-full bg-main-green text-white px-2 md:px-4 py-2 md:py-2 rounded-full text-[10px] md:text-xs tracking-[1px] md:tracking-[1.5px] uppercase font-medium hover:bg-gold-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <span className="md:hidden">Voir détails</span>
                      <span className="hidden md:inline">Voir les détails</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setShowZoom(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <button
              onClick={() => setShowZoom(false)}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-contain max-h-[85vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <ContactFooter />
    </div>
  )
}