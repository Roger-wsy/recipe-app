import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavorites,
    favoritesList,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data) {
        setRecipeDetailsData(data?.data?.recipe);
      }
    }

    getRecipeDetails();
  }, [id]);

  function checkIfItemInFavorites(getItem) {
    const index = favoritesList.findIndex((item) => item.id === getItem.id);

    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg-grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorites(recipeDetailsData)}
            className="text-sm p-3 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
          >
            {favoritesList.findIndex(
              (item) => item.id === recipeDetailsData?.id
            ) !== -1
              ? "Remove from favorite list"
              : "Save as Favorite"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-bold">Ingredients:</span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.ingredients.map((ingredient) => (
              <li className="font-semibold pt-2">
                <span>
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span>{ingredient.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
