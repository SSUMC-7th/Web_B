import CardSkeletion from "./card-skeleton";

const CardListSkeleton = ({ number }) => {
  return new Array(number)
    .fill(0)
    .map((_, index) => <CardSkeletion key={index} />);
};

export default CardListSkeleton;
