import React, { useEffect } from 'react'
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import styled from 'styled-components'

const GET_ALL_USERS = gql`
  query Users {
    users{
      id
      name
      status
      type
      date
    }
  }
`;
function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [qStatus, setQStatus] = useState("")
  const [qType, setQType] = useState("")

  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState(data?.users??[]);
  if (loading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  const mutateData = (params = "") => {
       const result = params
      ? data.users.filter(val => val.status.toLowerCase().includes(params) || val.name.toLowerCase().includes(params) || val.type.toLowerCase().includes(params))
      : data.users;
    return setUsers(result)
  };
  
  const filterData = (val)=>{
   return mutateData(val )
  }
  return (
    <>
     <Header>
        <h1>Frontend Assesment</h1>
        <RightHeader>
        <a href="mailto:onyekachionuoha20@gmail.com">Send me a mail</a>
        <a href="tel:+2347068513219">Click to Call my phone</a>
        </RightHeader>
      </Header>
      <Wrapper>
     
     <SearchDiv>
       <InputBox
         onChange={(e) =>{setSearchTerm(e.target.value); filterData(e.target.value)}}
         type="text"
         placeholder='Search by name '
       /> 
     </SearchDiv>
       <FilterDiv>
       <Select onChange={(e) => {setQStatus(e.target.value); filterData(e.target.value)}}>
             <Options>Filter by status</Options>
             <Options value="successful">Successful</Options>
             <Options value="pending">Pending</Options>
             <Options value="failed">Failed</Options>
           </Select>
           <Select onChange={(e) => {setQType(e.target.value); filterData(e.target.value)}}>
             <Options>Filter by Types</Options>
             <Options value="saving">Saving</Options>
             <Options value="current">Current</Options>
             <Options value="current">Fixed</Options>
           </Select>
       </FilterDiv>
         {users.map((user) => (
       <Container key={user.id}>
       <Left>
         <Date>{user.date}</Date>
         <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIhCBq-WV5kdxy5e-8fgzaYKejJFYOUnTt1Q&usqp=CAU' alt='user image' />
       </Left>
       <Right>
         <InfoContainer>
           <Key>Id:</Key>
           <Value>{user.id}</Value>
         </InfoContainer>
         
         <InfoContainer>
           <Key>Name:</Key>
           <Value>{user.name}</Value>
         </InfoContainer>

         <InfoContainer>
           <Key>Status:</Key>
           <Value>{user.status}</Value>
         </InfoContainer>


         <InfoContainer>
           <Key>Type:</Key>
           <Value>{user.type}</Value>
         </InfoContainer>

       </Right>
       </Container>
     ))}
   </Wrapper>
    </>
  

  );
}

export default App;
const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    gap: 10px;
    border-radius: 5px;
`
const Left = styled.div`
position: relative;
flex: 2;
display: flex;
flex-direction: column;
margin: 10px;
padding: 45px 0;
height: 180px;
color: #B38CFC;
/* background-color: #F0EBE3; */
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

`
const Right = styled.div`
flex: 10;
display: flex;
margin: 10px;
padding: 10px;
justify-content: start;
flex-direction: column;
/* background-color: #F0EBE3; */
border-radius: 5px;
   
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

`
const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const SearchDiv = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;

`

const InputBox= styled.input`
  width: 100%;
  border: 0;
  outline: none;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #B38CFC;
  background-color: transparent;
  ::placeholder{
    color: gray;
    font-size: 16px;
   color: #B38CFC;

  }
  `

const FilterDiv = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4rem;
  width: 100%;
`
const Select = styled.select`
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  color: #B38CFC;
background-color: transparent;

`
const Options = styled.option`
  margin: 0 10px;
  width: 80%;
  color: #B38CFC;
  

`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 20px;
  border-radius: 50%;
  align-self: center;
  object-fit:cover;
    :hover{
    width: 70px;
    height: 70px;
    transition: all 1s ease;
  }
`

const Date = styled.span`
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
  color: #B38CFC;

`
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`
const Key = styled.h2`
  flex: 2;
  font-size: 16px;
  color: #B38CFC;


  
`

const Value = styled.p`
flex: 10;
font-size: 16px;
font-weight: 500;
color: #B38CFC;


`
const Header = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  height: 86px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* border-bottom: 1px solid #B38CFC; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 15px;
  background-color: #fff;

  h1{
    color: #B38CFC;
    font-size: 24px;
    font-weight: 800;
  }
`

const RightHeader = styled.div`
  display: flex;
  gap: 10px;
  
  a{
    text-decoration: none;
    color: #B38CFC;
    font-size: 16px;
    font-weight: 800;

  }
`