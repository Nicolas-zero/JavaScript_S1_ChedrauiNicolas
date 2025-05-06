export const getGeneralInfoPeople= async() =>{
    const url = ("https://6814b2d9225ff1af1629c239.mockapi.io/people/people/");
    const option={
        method:"GET"
    };
    let res=await fetch(url,option);
    let data=await res.json();
    return data;
}