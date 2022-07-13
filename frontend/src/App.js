import React from 'react'
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import styled from 'styled-components'

const GET_USERS = gql`
  query Users($usersInput: UsersInputFilter) {
    users(input: $usersInput) {
     date
      id
      name
      type
      status
    }
  }
`;

function useUserFilters() {
  const [filters, _updateFilter] = useState({ 
    id: undefined, 
    name: undefined 
    
  });

  const updateFilter = (filterType, value) => {
    _updateFilter({
      [filterType]: value,
    });
  };

  return {
    models: { filters },
    operations: { updateFilter },
  };
}

const typeFilters = (e) =>{
console.log(e.target.value)
}
function App() {
  const { operations, models } = useUserFilters();

  const { data, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <Wrapper>
      {data ? <>
        <h1 style={{textAlign: 'center', margin: '20px'}}>Frontend Assesment</h1>
      <SearchDiv>
        <InputBox
          onChange={(e) => operations.updateFilter("name", e.target.value)}
          type="string"
          placeholder='Search by name '
        />
         <Button
        onClick={() =>
          refetch({
            usersInput: { status: models.filters.name },
          })
        }
      >
        Search
      </Button>
      </SearchDiv>
        <FilterDiv>
            <Select onChange={typeFilters}>
              <Options>Filter by status</Options>
              <Options value="saving">Successful</Options>
              <Options value="current">Pending</Options>
              <Options value="current">Failed</Options>
            </Select>
            <Select onChange={typeFilters}>
              <Options>Filter by Types</Options>
              <Options value="saving">Saving</Options>
              <Options value="current">Current</Options>
              <Options value="current">Fixed</Options>
            </Select>
        </FilterDiv>
          {data.users.map((user) => (
        <Container>
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
      </> : <p>No Data found please try again later</p>}

     
    </Wrapper>

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
background-color: #fff;
  :hover{
    transform: translateY(-10px);
    transition: all 0.5s ease;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  }
`
const Right = styled.div`
flex: 10;
display: flex;
margin: 10px;
padding: 10px;
justify-content: start;
flex-direction: column;
background-color: #fff;
:hover{
    transform: translateY(-10px);
    transition: all 0.5s ease;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  }
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
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  ::placeholder{
    color: gray;
    font-size: 16px;
  }
  `

const Button = styled.button`
  padding: 10px;
  border-top-right-radius: 5px;
  border-top-right-radius: 5px;
  outline: none;
  border: 0;
  background-color: paleturquoise;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
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
`
const Options = styled.option`
  margin: 0 10px;
  width: 80%;
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 20px;
  border-radius: 50%;
  align-self: center;
  object-fit:cover;
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
`
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`
const Key = styled.h2`
  flex: 2;
  font-size: 16px;
  
`

const Value = styled.p`
flex: 10;
font-size: 16px;
font-weight: 500;
`