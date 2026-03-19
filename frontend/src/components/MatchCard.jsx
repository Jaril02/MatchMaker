import ProfileCard from './ProfileCard.jsx'

export default function MatchCard({ match }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 blur-xl transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:blur-2xl" />
      <ProfileCard profile={match} />
    </div>
  )
}

