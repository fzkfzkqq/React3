export const addressToString = (address) => {
    let result = "N/A";
    if (address) {
        const street_number = address.street_number ? address.street_number : '';
        const route = address.route ? address.route + "," : '';
        const locality = address.locality ? address.locality : '';
        const administrative_area_level_1 = address.administrative_area_level_1 ? address.administrative_area_level_1 : '';
        const postal_code = address.postal_code ? address.postal_code : '';
        result = `${street_number} ${route} ${locality} ${administrative_area_level_1} ${postal_code}`;
    }
    return result;
}