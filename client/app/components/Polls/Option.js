import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Polls from './Polls';

const Option = ({option}) => {
    return (
        <>
        <p>{option.name}</p>
        

        </>
    );

}