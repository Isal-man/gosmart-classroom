export const EnrollmentCard = ({ image, fullName }) => {
  return (
    <div className={"flex justify-start items-center gap-4 p-4"}>
      <div className={"w-16 h-16"}>
        <img src={image} className={"object-cover w-full h-full rounded-full"}/>
      </div>
      <div>
        <p>{fullName}</p>
      </div>
    </div>
  )
}
