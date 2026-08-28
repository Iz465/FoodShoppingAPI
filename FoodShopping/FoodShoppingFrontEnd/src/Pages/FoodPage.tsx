import {useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { Food } from '../TypeScripts/Food';
import './FoodPage.css'
import { Link } from 'react-router-dom';

type FoodPageProps = {
    category: number | null,
    setFoodRequestProp: Dispatch<SetStateAction<Food | null>>    
}

function FoodPage({ category, setFoodRequestProp }: FoodPageProps) {

    const [foods, setFoods] = useState<Food[]>([])

    useEffect(() => { 
        async function GetSpecificFood() { 
            const response = await fetch(`http://localhost:5267/api/foods?categoryId=${Number(category)}`)

            if (!response.ok) return;
            const data = await response.json()
            console.log(data)
            setFoods(data);
        }
        GetSpecificFood()
    }, [category])

    async function StoreFoodRequest(food: Food)
    { 
        console.log(food.name);
        setFoodRequestProp(food)
    }

    return (
        <div>
            {foods.length > 0 &&(
                <h1 className="Title">{foods[0].category}</h1>
            )}

            <div className="FoodContainer">
            {foods.map((food) => (
                <div className="IndividualFoodDiv">
                    <Link to="/AddFood" className="Link" onClick={() => StoreFoodRequest(food)} ><img src={food.imageUrl} className="FoodImage FoodImageHover" /></Link> 
                    <div className="SubFoodDiv">

                    <p>{food.name}</p>
                    <p>${food.price}</p>
                </div>
                  
               

           </div>
            ))}
            </div>
        </div>
    )
}

export default FoodPage