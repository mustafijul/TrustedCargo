import { Link } from 'react-router'
import logo from '../assets/Tlogo.png'
export default function CargoLogo() {
  return (
   <Link to='/'>
    <div>
        <img className='w-14 h-14' src={logo} alt="" />
    </div>
   </Link>
  )
}
