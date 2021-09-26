import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import  { makeStyles }  from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    color: 'red',
  },
});

export default function Page({id, options, count, color, data, hello}) {
  return <MyWonderfulComponent 
            id={id} 
            options={options} 
            count={count} 
            color={color} 
            data={data} 
            hello={hello}>
    Im text from a component</MyWonderfulComponent>
}

function MyWonderfulComponent({id, options, children, ...other}) {
  const [ summ, setSumm ] = useState(other.count);

  console.log(`Передаем в компонент MyWonderfulComponent текст: ${other.hello}`);
  
  useEffect(() => {
    if (id && options?.params?.fields?.isDynamic) {
      setSumm(summ + 1);
    }
  }, [summ, id, options]);
  
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.root}>Hello World!</h1>
      <Grid>
        <Grid item xs={12}>{children}</Grid>
        <Grid>{ summ }</Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  console.log(`Hello from SSR`); //вывод текста в логи со стороны сервера и передачу в компонент - я понял так
  const hello = 'Hello from SSR'; //не уверен, что верно.
  return {
    props: {hello},
  }
}