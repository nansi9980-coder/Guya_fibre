"use client"

import { useState, useMemo } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { Input } from "./input"
import { Button } from "./button"
import { useLanguage } from "@/lib/i18n/context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { ScrollArea } from "./scroll-area"

export interface CountryCode {
  code: string
  flag: string
  nameEn: string
  nameFr: string
  nameEs?: string
  namePt?: string
  nameNl?: string
  nameGcr?: string
  nameAr?: string
  nameZh?: string
}

// Complete country list - 100+ countries with multilingual names
export const COUNTRY_CODES: CountryCode[] = [
  // PRIORITY COUNTRIES (Top)
  { code: "+594", flag: "🇬🇫", nameFr: "Guyane française", nameEn: "French Guiana", nameEs: "Guayana Francesa", namePt: "Guiana Francesa", nameNl: "Frans-Guyana", nameGcr: "Guyane Fransa" },
  { code: "+33", flag: "🇫🇷", nameFr: "France", nameEn: "France", nameEs: "Francia", namePt: "França", nameNl: "Frankrijk", nameGcr: "Frans" },
  { code: "+34", flag: "🇪🇸", nameFr: "Espagne", nameEn: "Spain", nameEs: "España", namePt: "Espanha", nameNl: "Spanje", nameGcr: "Panya" },
  { code: "+351", flag: "🇵🇹", nameFr: "Portugal", nameEn: "Portugal", nameEs: "Portugal", namePt: "Portugal", nameNl: "Portugal", nameGcr: "Potugal" },
  { code: "+31", flag: "🇳🇱", nameFr: "Pays-Bas", nameEn: "Netherlands", nameEs: "Países Bajos", namePt: "Holanda", nameNl: "Nederland", nameGcr: "Pays-Ba" },
  { code: "+55", flag: "🇧🇷", nameFr: "Brésil", nameEn: "Brazil", nameEs: "Brasil", namePt: "Brasil", nameNl: "Brazilië", nameGcr: "Brezil" },
  { code: "+51", flag: "🇵🇪", nameFr: "Pérou", nameEn: "Peru", nameEs: "Perú", namePt: "Peru", nameNl: "Peru", nameGcr: "Perou" },
  { code: "+57", flag: "🇨🇴", nameFr: "Colombie", nameEn: "Colombia", nameEs: "Colombia", namePt: "Colômbia", nameNl: "Colombia", nameGcr: "Kolombya" },
  { code: "+1", flag: "🇺🇸", nameFr: "États-Unis", nameEn: "United States", nameEs: "Estados Unidos", namePt: "Estados Unidos", nameNl: "Verenigde Staten", nameGcr: "Etats-Uni" },
  { code: "+1", flag: "🇨🇦", nameFr: "Canada", nameEn: "Canada", nameEs: "Canadá", namePt: "Canadá", nameNl: "Canada", nameGcr: "Kanada" },
  // EUROPE
  { code: "+44", flag: "🇬🇧", nameFr: "Royaume-Uni", nameEn: "United Kingdom", nameEs: "Reino Unido", namePt: "Reino Unido", nameNl: "Verenigd Koninkrijk", nameGcr: "Wayòm Ini" },
  { code: "+49", flag: "🇩🇪", nameFr: "Allemagne", nameEn: "Germany", nameEs: "Alemania", namePt: "Alemanha", nameNl: "Duitsland", nameGcr: "Alemay" },
  { code: "+39", flag: "🇮🇹", nameFr: "Italie", nameEn: "Italy", nameEs: "Italia", namePt: "Itália", nameNl: "Italië", nameGcr: "Itali" },
  { code: "+41", flag: "🇨🇭", nameFr: "Suisse", nameEn: "Switzerland", nameEs: "Suiza", namePt: "Suíça", nameNl: "Zwitserland", nameGcr: "Swis" },
  { code: "+43", flag: "🇦🇹", nameFr: "Autriche", nameEn: "Austria", nameEs: "Austria", namePt: "Áustria", nameNl: "Oostenrijk", nameGcr: "Otrich" },
  { code: "+45", flag: "🇩🇰", nameFr: "Danemark", nameEn: "Denmark", nameEs: "Dinamarca", namePt: "Dinamarca", nameNl: "Denemarken", nameGcr: "Danmak" },
  { code: "+46", flag: "🇸🇪", nameFr: "Suède", nameEn: "Sweden", nameEs: "Suecia", namePt: "Suécia", nameNl: "Zweden", nameGcr: "Swed" },
  { code: "+47", flag: "🇳🇴", nameFr: "Norvège", nameEn: "Norway", nameEs: "Noruega", namePt: "Noruega", nameNl: "Noorwegen", nameGcr: "Norwej" },
  { code: "+48", flag: "🇵🇱", nameFr: "Pologne", nameEn: "Poland", nameEs: "Polonia", namePt: "Polônia", nameNl: "Polen", nameGcr: "Polong" },
  { code: "+30", flag: "🇬🇷", nameFr: "Grèce", nameEn: "Greece", nameEs: "Grecia", namePt: "Grécia", nameNl: "Griekenland", nameGcr: "Grès" },
  { code: "+358", flag: "🇫🇮", nameFr: "Finlande", nameEn: "Finland", nameEs: "Finlandia", namePt: "Finlândia", nameNl: "Finland", nameGcr: "Finlann" },
  { code: "+40", flag: "🇷🇴", nameFr: "Roumanie", nameEn: "Romania", nameEs: "Rumania", namePt: "Romênia", nameNl: "Roemenië", nameGcr: "Roumen" },
  { code: "+359", flag: "🇧🇬", nameFr: "Bulgarie", nameEn: "Bulgaria", nameEs: "Bulgaria", namePt: "Bulgária", nameNl: "Bulgarije", nameGcr: "Bulgari" },
  { code: "+385", flag: "🇭🇷", nameFr: "Croatie", nameEn: "Croatia", nameEs: "Croacia", namePt: "Croácia", nameNl: "Kroatië", nameGcr: "Kroasi" },
  { code: "+36", flag: "🇭🇺", nameFr: "Hongrie", nameEn: "Hungary", nameEs: "Hungría", namePt: "Hungria", nameNl: "Hongarije", nameGcr: "Ongarya" },
  { code: "+7", flag: "🇷🇺", nameFr: "Russie", nameEn: "Russia", nameEs: "Rusia", namePt: "Rússia", nameNl: "Rusland", nameGcr: "Rusi" },
  { code: "+380", flag: "🇺🇦", nameFr: "Ukraine", nameEn: "Ukraine", nameEs: "Ucrania", namePt: "Ucrânia", nameNl: "Oekraïne", nameGcr: "Ikren" },
  // AMERICAS CONTINUED
  { code: "+52", flag: "🇲🇽", nameFr: "Mexique", nameEn: "Mexico", nameEs: "México", namePt: "México", nameNl: "Mexico", nameGcr: "Meksik" },
  { code: "+56", flag: "🇨🇱", nameFr: "Chili", nameEn: "Chile", nameEs: "Chile", namePt: "Chile", nameNl: "Chili", nameGcr: "Chili" },
  { code: "+54", flag: "🇦🇷", nameFr: "Argentine", nameEn: "Argentina", nameEs: "Argentina", namePt: "Argentina", nameNl: "Argentinië", nameGcr: "Ajantin" },
  { code: "+591", flag: "🇧🇴", nameFr: "Bolivie", nameEn: "Bolivia", nameEs: "Bolivia", namePt: "Bolívia", nameNl: "Bolivia", nameGcr: "Bolivi" },
  { code: "+593", flag: "🇪🇨", nameFr: "Équateur", nameEn: "Ecuador", nameEs: "Ecuador", namePt: "Equador", nameNl: "Ecuador", nameGcr: "Ekwador" },
  { code: "+598", flag: "🇺🇾", nameFr: "Uruguay", nameEn: "Uruguay", nameEs: "Uruguay", namePt: "Uruguai", nameNl: "Uruguay", nameGcr: "Uruguway" },
  { code: "+595", flag: "🇵🇾", nameFr: "Paraguay", nameEn: "Paraguay", nameEs: "Paraguay", namePt: "Paraguai", nameNl: "Paraguay", nameGcr: "Paraguay" },
  { code: "+58", flag: "🇻🇪", nameFr: "Venezuela", nameEn: "Venezuela", nameEs: "Venezuela", namePt: "Venezuela", nameNl: "Venezuela", nameGcr: "Veneswela" },
  // AFRICA
  { code: "+20", flag: "🇪🇬", nameFr: "Égypte", nameEn: "Egypt", nameEs: "Egipto", namePt: "Egito", nameNl: "Egypte", nameGcr: "Ejip" },
  { code: "+27", flag: "🇿🇦", nameFr: "Afrique du Sud", nameEn: "South Africa", nameEs: "Sudáfrica", namePt: "África do Sul", nameNl: "Zuid-Afrika", nameGcr: "Afrik Sid" },
  { code: "+234", flag: "🇳🇬", nameFr: "Nigéria", nameEn: "Nigeria", nameEs: "Nigeria", namePt: "Nigéria", nameNl: "Nigeria", nameGcr: "Nijeria" },
  { code: "+212", flag: "🇲🇦", nameFr: "Maroc", nameEn: "Morocco", nameEs: "Marruecos", namePt: "Marrocos", nameNl: "Marokko", nameGcr: "Marok" },
  { code: "+213", flag: "🇩🇿", nameFr: "Algérie", nameEn: "Algeria", nameEs: "Argelia", namePt: "Argélia", nameNl: "Algerije", nameGcr: "Aljeri" },
  { code: "+216", flag: "🇹🇳", nameFr: "Tunisie", nameEn: "Tunisia", nameEs: "Túnez", namePt: "Tunísia", nameNl: "Tunesië", nameGcr: "Tinizi" },
  { code: "+221", flag: "🇸🇳", nameFr: "Sénégal", nameEn: "Senegal", nameEs: "Senegal", namePt: "Senegal", nameNl: "Senegal", nameGcr: "Senegal" },
  { code: "+225", flag: "🇨🇮", nameFr: "Côte d'Ivoire", nameEn: "Ivory Coast", nameEs: "Costa de Marfil", namePt: "Costa do Marfim", nameNl: "Ivoorkust", nameGcr: "Kòt Divwa" },
  { code: "+226", flag: "🇧🇫", nameFr: "Burkina Faso", nameEn: "Burkina Faso", nameEs: "Burkina Faso", namePt: "Burkina Faso", nameNl: "Burkina Faso", nameGcr: "Burkina Faso" },
  { code: "+227", flag: "🇳🇪", nameFr: "Niger", nameEn: "Niger", nameEs: "Níger", namePt: "Níger", nameNl: "Niger", nameGcr: "Nijè" },
  { code: "+230", flag: "🇲🇺", nameFr: "Maurice", nameEn: "Mauritius", nameEs: "Mauricio", namePt: "Maurício", nameNl: "Mauritius", nameGcr: "Moris" },
  { code: "+233", flag: "🇬🇭", nameFr: "Ghana", nameEn: "Ghana", nameEs: "Ghana", namePt: "Gana", nameNl: "Ghana", nameGcr: "Ghana" },
  { code: "+256", flag: "🇺🇬", nameFr: "Ouganda", nameEn: "Uganda", nameEs: "Uganda", namePt: "Uganda", nameNl: "Oeganda", nameGcr: "Uganda" },
  { code: "+255", flag: "🇹🇿", nameFr: "Tanzanie", nameEn: "Tanzania", nameEs: "Tanzania", namePt: "Tanzânia", nameNl: "Tanzania", nameGcr: "Tanzani" },
  { code: "+260", flag: "🇿🇲", nameFr: "Zambie", nameEn: "Zambia", nameEs: "Zambia", namePt: "Zâmbia", nameNl: "Zambia", nameGcr: "Zambi" },
  { code: "+263", flag: "🇿🇼", nameFr: "Zimbabwe", nameEn: "Zimbabwe", nameEs: "Zimbabue", namePt: "Zimbábue", nameNl: "Zimbabwe", nameGcr: "Zimbabwe" },
  // ASIA
  { code: "+86", flag: "🇨🇳", nameFr: "Chine", nameEn: "China", nameEs: "China", namePt: "China", nameNl: "China", nameGcr: "Chin" },
  { code: "+81", flag: "🇯🇵", nameFr: "Japon", nameEn: "Japan", nameEs: "Japón", namePt: "Japão", nameNl: "Japan", nameGcr: "Japon" },
  { code: "+82", flag: "🇰🇷", nameFr: "Corée du Sud", nameEn: "South Korea", nameEs: "Corea del Sur", namePt: "Coreia do Sul", nameNl: "Zuid-Korea", nameGcr: "Kore Sid" },
  { code: "+84", flag: "🇻🇳", nameFr: "Vietnam", nameEn: "Vietnam", nameEs: "Vietnam", namePt: "Vietnã", nameNl: "Vietnam", nameGcr: "Vietnam" },
  { code: "+66", flag: "🇹🇭", nameFr: "Thaïlande", nameEn: "Thailand", nameEs: "Tailandia", namePt: "Tailândia", nameNl: "Thailand", nameGcr: "Tailann" },
  { code: "+60", flag: "🇲🇾", nameFr: "Malaisie", nameEn: "Malaysia", nameEs: "Malasia", namePt: "Malásia", nameNl: "Maleisië", nameGcr: "Malezi" },
  { code: "+65", flag: "🇸🇬", nameFr: "Singapour", nameEn: "Singapore", nameEs: "Singapur", namePt: "Singapura", nameNl: "Singapore", nameGcr: "Singapor" },
  { code: "+63", flag: "🇵🇭", nameFr: "Philippines", nameEn: "Philippines", nameEs: "Filipinas", namePt: "Filipinas", nameNl: "Filipijnen", nameGcr: "Filipin" },
  { code: "+62", flag: "🇮🇩", nameFr: "Indonésie", nameEn: "Indonesia", nameEs: "Indonesia", namePt: "Indonésia", nameNl: "Indonesië", nameGcr: "Indonezi" },
  { code: "+91", flag: "🇮🇳", nameFr: "Inde", nameEn: "India", nameEs: "India", namePt: "Índia", nameNl: "India", nameGcr: "Inde" },
  { code: "+880", flag: "🇧🇩", nameFr: "Bangladesh", nameEn: "Bangladesh", nameEs: "Bangladesh", namePt: "Bangladesh", nameNl: "Bangladesh", nameGcr: "Bangladesh" },
  { code: "+98", flag: "🇮🇷", nameFr: "Iran", nameEn: "Iran", nameEs: "Irán", namePt: "Irã", nameNl: "Iran", nameGcr: "Iran" },
  { code: "+966", flag: "🇸🇦", nameFr: "Arabie Saoudite", nameEn: "Saudi Arabia", nameEs: "Arabia Saudita", namePt: "Arábia Saudita", nameNl: "Saoedi-Arabië", nameGcr: "Arabi Sawdit" },
  { code: "+971", flag: "🇦🇪", nameFr: "Émirats Arabes Unis", nameEn: "UAE", nameEs: "Emiratos Árabes", namePt: "Emirados Árabes", nameNl: "V.A.E", nameGcr: "Emirats Arabe" },
  { code: "+61", flag: "🇦🇺", nameFr: "Australie", nameEn: "Australia", nameEs: "Australia", namePt: "Austrália", nameNl: "Australië", nameGcr: "Ostrali" },
  { code: "+64", flag: "🇳🇿", nameFr: "Nouvelle-Zélande", nameEn: "New Zealand", nameEs: "Nueva Zelanda", namePt: "Nova Zelândia", nameNl: "Nieuw-Zeeland", nameGcr: "Nouvel Zelan" },
  // ADDED COUNTRIES / TERRITORIES
  { code: "+93", flag: "🇦🇫", nameFr: "Afghanistan", nameEn: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", nameFr: "Albanie", nameEn: "Albania" },
  { code: "+376", flag: "🇦🇩", nameFr: "Andorre", nameEn: "Andorra" },
  { code: "+244", flag: "🇦🇴", nameFr: "Angola", nameEn: "Angola" },
  { code: "+374", flag: "🇦🇲", nameFr: "Arménie", nameEn: "Armenia" },
  { code: "+994", flag: "🇦🇿", nameFr: "Azerbaïdjan", nameEn: "Azerbaijan" },
  { code: "+973", flag: "🇧🇭", nameFr: "Bahreïn", nameEn: "Bahrain" },
  { code: "+375", flag: "🇧🇾", nameFr: "Biélorussie", nameEn: "Belarus" },
  { code: "+32", flag: "🇧🇪", nameFr: "Belgique", nameEn: "Belgium" },
  { code: "+501", flag: "🇧🇿", nameFr: "Belize", nameEn: "Belize" },
  { code: "+229", flag: "🇧🇯", nameFr: "Bénin", nameEn: "Benin" },
  { code: "+975", flag: "🇧🇹", nameFr: "Bhoutan", nameEn: "Bhutan" },
  { code: "+387", flag: "🇧🇦", nameFr: "Bosnie-Herzégovine", nameEn: "Bosnia and Herzegovina" },
  { code: "+267", flag: "🇧🇼", nameFr: "Botswana", nameEn: "Botswana" },
  { code: "+673", flag: "🇧🇳", nameFr: "Brunéi", nameEn: "Brunei" },
  { code: "+855", flag: "🇰🇭", nameFr: "Cambodge", nameEn: "Cambodia" },
  { code: "+237", flag: "🇨🇲", nameFr: "Cameroun", nameEn: "Cameroon" },
  { code: "+238", flag: "🇨🇻", nameFr: "Cap-Vert", nameEn: "Cape Verde" },
  { code: "+236", flag: "🇨🇫", nameFr: "Centrafrique", nameEn: "Central African Republic" },
  { code: "+235", flag: "🇹🇩", nameFr: "Tchad", nameEn: "Chad" },
  { code: "+269", flag: "🇰🇲", nameFr: "Comores", nameEn: "Comoros" },
  { code: "+242", flag: "🇨🇬", nameFr: "Congo", nameEn: "Congo" },
  { code: "+243", flag: "🇨🇩", nameFr: "RD Congo", nameEn: "DR Congo" },
  { code: "+506", flag: "🇨🇷", nameFr: "Costa Rica", nameEn: "Costa Rica" },
  { code: "+53", flag: "🇨🇺", nameFr: "Cuba", nameEn: "Cuba" },
  { code: "+357", flag: "🇨🇾", nameFr: "Chypre", nameEn: "Cyprus" },
  { code: "+420", flag: "🇨🇿", nameFr: "Tchéquie", nameEn: "Czech Republic" },
  { code: "+253", flag: "🇩🇯", nameFr: "Djibouti", nameEn: "Djibouti" },
  { code: "+1", flag: "🇩🇴", nameFr: "République dominicaine", nameEn: "Dominican Republic" },
  { code: "+670", flag: "🇹🇱", nameFr: "Timor oriental", nameEn: "Timor-Leste" },
  { code: "+503", flag: "🇸🇻", nameFr: "Salvador", nameEn: "El Salvador" },
  { code: "+240", flag: "🇬🇶", nameFr: "Guinée équatoriale", nameEn: "Equatorial Guinea" },
  { code: "+291", flag: "🇪🇷", nameFr: "Érythrée", nameEn: "Eritrea" },
  { code: "+372", flag: "🇪🇪", nameFr: "Estonie", nameEn: "Estonia" },
  { code: "+251", flag: "🇪🇹", nameFr: "Éthiopie", nameEn: "Ethiopia" },
  { code: "+679", flag: "🇫🇯", nameFr: "Fidji", nameEn: "Fiji" },
  { code: "+241", flag: "🇬🇦", nameFr: "Gabon", nameEn: "Gabon" },
  { code: "+220", flag: "🇬🇲", nameFr: "Gambie", nameEn: "Gambia" },
  { code: "+995", flag: "🇬🇪", nameFr: "Géorgie", nameEn: "Georgia" },
  { code: "+350", flag: "🇬🇮", nameFr: "Gibraltar", nameEn: "Gibraltar" },
  { code: "+224", flag: "🇬🇳", nameFr: "Guinée", nameEn: "Guinea" },
  { code: "+245", flag: "🇬🇼", nameFr: "Guinée-Bissau", nameEn: "Guinea-Bissau" },
  { code: "+592", flag: "🇬🇾", nameFr: "Guyana", nameEn: "Guyana" },
  { code: "+509", flag: "🇭🇹", nameFr: "Haïti", nameEn: "Haiti" },
  { code: "+504", flag: "🇭🇳", nameFr: "Honduras", nameEn: "Honduras" },
  { code: "+852", flag: "🇭🇰", nameFr: "Hong Kong", nameEn: "Hong Kong" },
  { code: "+354", flag: "🇮🇸", nameFr: "Islande", nameEn: "Iceland" },
  { code: "+964", flag: "🇮🇶", nameFr: "Irak", nameEn: "Iraq" },
  { code: "+353", flag: "🇮🇪", nameFr: "Irlande", nameEn: "Ireland" },
  { code: "+972", flag: "🇮🇱", nameFr: "Israël", nameEn: "Israel" },
  { code: "+1876", flag: "🇯🇲", nameFr: "Jamaïque", nameEn: "Jamaica" },
  { code: "+962", flag: "🇯🇴", nameFr: "Jordanie", nameEn: "Jordan" },
  { code: "+7", flag: "🇰🇿", nameFr: "Kazakhstan", nameEn: "Kazakhstan" },
  { code: "+254", flag: "🇰🇪", nameFr: "Kenya", nameEn: "Kenya" },
  { code: "+686", flag: "🇰🇮", nameFr: "Kiribati", nameEn: "Kiribati" },
  { code: "+965", flag: "🇰🇼", nameFr: "Koweït", nameEn: "Kuwait" },
  { code: "+996", flag: "🇰🇬", nameFr: "Kirghizistan", nameEn: "Kyrgyzstan" },
  { code: "+856", flag: "🇱🇦", nameFr: "Laos", nameEn: "Laos" },
  { code: "+371", flag: "🇱🇻", nameFr: "Lettonie", nameEn: "Latvia" },
  { code: "+961", flag: "🇱🇧", nameFr: "Liban", nameEn: "Lebanon" },
  { code: "+266", flag: "🇱🇸", nameFr: "Lesotho", nameEn: "Lesotho" },
  { code: "+231", flag: "🇱🇷", nameFr: "Libéria", nameEn: "Liberia" },
  { code: "+218", flag: "🇱🇾", nameFr: "Libye", nameEn: "Libya" },
  { code: "+423", flag: "🇱🇮", nameFr: "Liechtenstein", nameEn: "Liechtenstein" },
  { code: "+370", flag: "🇱🇹", nameFr: "Lituanie", nameEn: "Lithuania" },
  { code: "+352", flag: "🇱🇺", nameFr: "Luxembourg", nameEn: "Luxembourg" },
  { code: "+853", flag: "🇲🇴", nameFr: "Macao", nameEn: "Macau" },
  { code: "+389", flag: "🇲🇰", nameFr: "Macédoine du Nord", nameEn: "North Macedonia" },
  { code: "+261", flag: "🇲🇬", nameFr: "Madagascar", nameEn: "Madagascar" },
  { code: "+265", flag: "🇲🇼", nameFr: "Malawi", nameEn: "Malawi" },
  { code: "+960", flag: "🇲🇻", nameFr: "Maldives", nameEn: "Maldives" },
  { code: "+223", flag: "🇲🇱", nameFr: "Mali", nameEn: "Mali" },
  { code: "+356", flag: "🇲🇹", nameFr: "Malte", nameEn: "Malta" },
  { code: "+692", flag: "🇲🇭", nameFr: "Îles Marshall", nameEn: "Marshall Islands" },
  { code: "+222", flag: "🇲🇷", nameFr: "Mauritanie", nameEn: "Mauritania" },
  { code: "+52", flag: "🇲🇽", nameFr: "Mexique", nameEn: "Mexico" },
  { code: "+691", flag: "🇫🇲", nameFr: "Micronésie", nameEn: "Micronesia" },
  { code: "+373", flag: "🇲🇩", nameFr: "Moldavie", nameEn: "Moldova" },
  { code: "+377", flag: "🇲🇨", nameFr: "Monaco", nameEn: "Monaco" },
  { code: "+976", flag: "🇲🇳", nameFr: "Mongolie", nameEn: "Mongolia" },
  { code: "+382", flag: "🇲🇪", nameFr: "Monténégro", nameEn: "Montenegro" },
  { code: "+258", flag: "🇲🇿", nameFr: "Mozambique", nameEn: "Mozambique" },
  { code: "+95", flag: "🇲🇲", nameFr: "Myanmar", nameEn: "Myanmar" },
  { code: "+264", flag: "🇳🇦", nameFr: "Namibie", nameEn: "Namibia" },
  { code: "+674", flag: "🇳🇷", nameFr: "Nauru", nameEn: "Nauru" },
  { code: "+977", flag: "🇳🇵", nameFr: "Népal", nameEn: "Nepal" },
  { code: "+227", flag: "🇳🇪", nameFr: "Niger", nameEn: "Niger" },
  { code: "+505", flag: "🇳🇮", nameFr: "Nicaragua", nameEn: "Nicaragua" },
  { code: "+47", flag: "🇳🇴", nameFr: "Norvège", nameEn: "Norway" },
  { code: "+968", flag: "🇴🇲", nameFr: "Oman", nameEn: "Oman" },
  { code: "+92", flag: "🇵🇰", nameFr: "Pakistan", nameEn: "Pakistan" },
  { code: "+680", flag: "🇵🇼", nameFr: "Palaos", nameEn: "Palau" },
  { code: "+970", flag: "🇵🇸", nameFr: "Palestine", nameEn: "Palestine" },
  { code: "+507", flag: "🇵🇦", nameFr: "Panama", nameEn: "Panama" },
  { code: "+675", flag: "🇵🇬", nameFr: "Papouasie-Nouvelle-Guinée", nameEn: "Papua New Guinea" },
  { code: "+63", flag: "🇵🇭", nameFr: "Philippines", nameEn: "Philippines" },
  { code: "+351", flag: "🇵🇹", nameFr: "Portugal", nameEn: "Portugal" },
  { code: "+974", flag: "🇶🇦", nameFr: "Qatar", nameEn: "Qatar" },
  { code: "+262", flag: "🇷🇪", nameFr: "La Réunion", nameEn: "Réunion" },
  { code: "+250", flag: "🇷🇼", nameFr: "Rwanda", nameEn: "Rwanda" },
  { code: "+1869", flag: "🇰🇳", nameFr: "Saint-Christophe-et-Niévès", nameEn: "Saint Kitts and Nevis" },
  { code: "+1758", flag: "🇱🇨", nameFr: "Sainte-Lucie", nameEn: "Saint Lucia" },
  { code: "+1784", flag: "🇻🇨", nameFr: "Saint-Vincent-et-les-Grenadines", nameEn: "Saint Vincent and the Grenadines" },
  { code: "+685", flag: "🇼🇸", nameFr: "Samoa", nameEn: "Samoa" },
  { code: "+378", flag: "🇸🇲", nameFr: "Saint-Marin", nameEn: "San Marino" },
  { code: "+239", flag: "🇸🇹", nameFr: "Sao Tomé-et-Principe", nameEn: "Sao Tome and Principe" },
  { code: "+381", flag: "🇷🇸", nameFr: "Serbie", nameEn: "Serbia" },
  { code: "+248", flag: "🇸🇨", nameFr: "Seychelles", nameEn: "Seychelles" },
  { code: "+232", flag: "🇸🇱", nameFr: "Sierra Leone", nameEn: "Sierra Leone" },
  { code: "+421", flag: "🇸🇰", nameFr: "Slovaquie", nameEn: "Slovakia" },
  { code: "+386", flag: "🇸🇮", nameFr: "Slovénie", nameEn: "Slovenia" },
  { code: "+677", flag: "🇸🇧", nameFr: "Îles Salomon", nameEn: "Solomon Islands" },
  { code: "+252", flag: "🇸🇴", nameFr: "Somalie", nameEn: "Somalia" },
  { code: "+94", flag: "🇱🇰", nameFr: "Sri Lanka", nameEn: "Sri Lanka" },
  { code: "+249", flag: "🇸🇩", nameFr: "Soudan", nameEn: "Sudan" },
  { code: "+597", flag: "🇸🇷", nameFr: "Suriname", nameEn: "Suriname" },
  { code: "+268", flag: "🇸🇿", nameFr: "Eswatini", nameEn: "Eswatini" },
  { code: "+963", flag: "🇸🇾", nameFr: "Syrie", nameEn: "Syria" },
  { code: "+886", flag: "🇹🇼", nameFr: "Taïwan", nameEn: "Taiwan" },
  { code: "+992", flag: "🇹🇯", nameFr: "Tadjikistan", nameEn: "Tajikistan" },
  { code: "+228", flag: "🇹🇬", nameFr: "Togo", nameEn: "Togo" },
  { code: "+676", flag: "🇹🇴", nameFr: "Tonga", nameEn: "Tonga" },
  { code: "+1868", flag: "🇹🇹", nameFr: "Trinité-et-Tobago", nameEn: "Trinidad and Tobago" },
  { code: "+90", flag: "🇹🇷", nameFr: "Turquie", nameEn: "Turkey" },
  { code: "+993", flag: "🇹🇲", nameFr: "Turkménistan", nameEn: "Turkmenistan" },
  { code: "+688", flag: "🇹🇻", nameFr: "Tuvalu", nameEn: "Tuvalu" },
  { code: "+380", flag: "🇺🇦", nameFr: "Ukraine", nameEn: "Ukraine" },
  { code: "+598", flag: "🇺🇾", nameFr: "Uruguay", nameEn: "Uruguay" },
  { code: "+998", flag: "🇺🇿", nameFr: "Ouzbékistan", nameEn: "Uzbekistan" },
  { code: "+678", flag: "🇻🇺", nameFr: "Vanuatu", nameEn: "Vanuatu" },
  { code: "+379", flag: "🇻🇦", nameFr: "Vatican", nameEn: "Vatican City" },
  { code: "+84", flag: "🇻🇳", nameFr: "Vietnam", nameEn: "Vietnam" },
  { code: "+967", flag: "🇾🇪", nameFr: "Yémen", nameEn: "Yemen" },
  { code: "+260", flag: "🇿🇲", nameFr: "Zambie", nameEn: "Zambia" },
  { code: "+263", flag: "🇿🇼", nameFr: "Zimbabwe", nameEn: "Zimbabwe" },
]

interface PhoneInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  countryCode: string
  onCountryCodeChange: (code: string) => void
  placeholder?: string
  required?: boolean
}

function getCountryName(country: CountryCode, locale: string): string {
  switch(locale) {
    case "en": return country.nameEn
    case "es": return country.nameEs || country.nameEn
    case "pt": return country.namePt || country.nameEn
    case "nl": return country.nameNl || country.nameEn
    case "gcr": return country.nameGcr || country.nameFr
    case "ar": return country.nameAr || country.nameEn
    case "zh": return country.nameZh || country.nameEn
    default: return country.nameFr
  }
}

export function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  placeholder,
  required = false,
}: PhoneInputProps) {
  const { locale } = useLanguage()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const priorityCountryCodes = useMemo(() => ["+594", "+33", "+44", "+34", "+55", "+31", "+966", "+86"], [])

  const sortedCountries = useMemo(() => {
    const uniqueCountries = COUNTRY_CODES.filter((country, index, array) => {
      const key = `${country.code}-${country.flag}`
      return array.findIndex((item) => `${item.code}-${item.flag}` === key) === index
    })

    const priority = uniqueCountries.filter((country) => priorityCountryCodes.includes(country.code))
    const others = uniqueCountries
      .filter((country) => !priorityCountryCodes.includes(country.code))
      .sort((a, b) => getCountryName(a, locale).localeCompare(getCountryName(b, locale), locale))

    return [...priority, ...others]
  }, [locale, priorityCountryCodes])

  const selectedCountry = sortedCountries.find(
    c => c.code === countryCode && getCountryName(c, locale) 
  ) || sortedCountries[0]

  const filteredCountries = useMemo(() => {
    if (!search) return sortedCountries
    const lowerSearch = search.toLowerCase()
    return sortedCountries.filter(country => {
      const name = getCountryName(country, locale).toLowerCase()
      return name.includes(lowerSearch) || country.code.includes(lowerSearch)
    })
  }, [search, locale, sortedCountries])

  const getPlaceholder = (): string => {
    if (placeholder) return placeholder
    if (countryCode === "+594" || countryCode === "+33") return "6 94 00 00 00"
    if (countryCode === "+55" || countryCode === "+51" || countryCode === "+57") return "(21) 99999-9999"
    return "9999999999"
  }

  const searchPlaceholder = locale === "en" ? "Search country..." : 
                            locale === "es" ? "Buscar país..." :
                            locale === "pt" ? "Pesquisar país..." :
                            locale === "nl" ? "Land zoeken..." :
                            locale === "gcr" ? "Chèche peyi..." :
                            locale === "ar" ? "ابحث عن دولة..." :
                            locale === "zh" ? "搜索国家..." :
                            "Chercher un pays..."

  const noResultsText = locale === "en" ? "No countries found" :
                        locale === "es" ? "No se encontraron países" :
                        locale === "pt" ? "Nenhum país encontrado" :
                        locale === "nl" ? "Geen landen gevonden" :
                        locale === "gcr" ? "Pa gen peyi" :
                        locale === "ar" ? "لم يتم العثور على دول" :
                        locale === "zh" ? "未找到国家" :
                        "Aucun pays trouvé"

  return (
    <div className="flex gap-2 w-full min-w-0">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-28 min-w-[7rem] h-9 px-2.5 justify-between font-medium text-xs hover:bg-accent transition-all duration-200 animate-in fade-in-50"
            size="sm"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="text-base">{selectedCountry.flag}</span>
              <span className="text-[11px] font-semibold">{countryCode}</span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 opacity-50 flex-shrink-0 transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72 p-0">
          <div className="sticky top-0 p-3 border-b border-border bg-background z-10">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-8 h-9 text-sm focus:ring-2 focus:ring-primary/30"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <ScrollArea className="h-80">
            {filteredCountries.length > 0 ? (
              <div className="p-1">
                {filteredCountries.map((country, idx) => {
                  const isSelected = countryCode === country.code
                  return (
                    <button
                      key={`${country.code}-${country.flag}-${idx}`}
                      onClick={() => {
                        onCountryCodeChange(country.code)
                        setOpen(false)
                        setSearch("")
                      }}
                      className="w-full px-2 py-2.5 text-left text-sm hover:bg-accent active:bg-accent/80 transition-colors duration-150 flex items-center gap-2 group cursor-pointer rounded"
                    >
                      <span className="text-lg flex-shrink-0">{country.flag}</span>
                      <span className="flex-1 truncate font-medium">
                        {getCountryName(country, locale)}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold flex-shrink-0">
                        {country.code}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary flex-shrink-0 animate-in fade-in-50" />
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                {noResultsText}
              </div>
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="tel"
        value={value}
        onChange={(e) => {
          // Allow only digits and common phone separators
          const input = e.currentTarget.value
          const formatted = input
            .replace(/[^\d\s\-()./+]/g, '') // Remove invalid characters
            .slice(0, 20) // Max length
          
          // Create a new event with the formatted value
          const newEvent = {
            ...e,
            currentTarget: {
              ...e.currentTarget,
              value: formatted
            }
          } as React.ChangeEvent<HTMLInputElement>
          
          onChange(newEvent)
        }}
        placeholder={getPlaceholder()}
        required={required}
        className="flex-1 h-9 text-[13px] transition-all focus:ring-2 focus:ring-primary/30"
        autoComplete="tel"
        inputMode="tel"
      />
    </div>
  )
}
