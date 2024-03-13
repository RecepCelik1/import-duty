import { useSelector } from "react-redux"


const Consequences = () => {
    const itemInfos = useSelector(state => state.itemInfos)
    const itemSellingPrice = itemInfos.itemSellingPrice;
    const shippingCharge = itemInfos.shippingCharge;

    const selectedTypeOfGood = itemInfos.selectedTypeOfGood
    const selectedCimcif = itemInfos.selectedCimCif

    const itemStats = useSelector(state => state.getItemStats)

    const itemID = itemStats.commodityID

    const parsingFunction = (value) => {

        const filteredValue = value.replace(/[^0-9,.]/g, "");
        let parsedValue = parseFloat(filteredValue.replace("," , "."));

        if(isNaN(parsedValue)) {
            parsedValue = 0
        }

        return parsedValue
    }

    let itemRate = itemStats.item?.data?.meta?.duty_calculator?.applicable_vat_options

    if(itemRate !== undefined){
        itemRate = parsingFunction(itemRate.VAT)
    } else {
        itemRate = 0
    }

    if(selectedTypeOfGood.value === "gifts"){
        itemRate = 0
    }

    let VATcost

    if (selectedCimcif.value === "cif"){
        VATcost = (itemSellingPrice + shippingCharge)*itemRate/100
    } else {
        VATcost = itemSellingPrice*itemRate/100
    }

    let totalItemPrice = itemSellingPrice + VATcost + shippingCharge

    return (
        <div className="w-full p-3 flex flex-col bg-gray-200 rounded-md">
            <div className="flex justify-between">
                <div className="flex flex-col font-bold text-lg">
                    <div>Total for</div>
                    <div>{itemID}</div>
                </div>
                <div className="flex justify-center font-bold text-xl">{totalItemPrice.toFixed(2)} GBP</div>
            </div>

            <div className="flex justify-between items-center mt-2">
                <div className="text-gray-600  font-gabarito text-lg">Shipping / Insurance</div>
                <div className="font-gabarito text-gray-600 flex justify-center text-lg">{shippingCharge.toFixed(2)} GBP</div>
            </div>

            <div className="flex justify-between items-center mt-2">
                <div className="text-gray-600  font-gabarito text-lg">Import duty - 0%</div>
                <div className="font-gabarito text-gray-600 flex justify-center text-lg">0 GBP</div>
            </div>

            <div className="flex justify-between items-center mt-2">
                <div className="text-gray-600  font-gabarito text-lg">VAT - {itemRate}</div>
                <div className="font-gabarito text-gray-600 flex justify-center text-lg">{VATcost.toFixed(2)} GBP</div>
            </div>

            
        </div>
    )
}

export default Consequences