/**
 * @file AnalyticsDashboard.js
 * @module AnalyticsDashboard
 * @description
 * Interactive analytics dashboard displaying visualized metrics
 * for Customers, Companies, and Stocks. A dropdown lets users choose
 * which analytics subject to view. The selection persists across sessions
 * using localStorage.
 *
 * @requires react
 * @requires recharts
 * @requires ../ApiRequest
 * @requires ./AIDashboard.css
 */

import { useState } from 'react';
import { api } from '../ApiRequest';
import './AIDashboard.css';

/**
 * @function AIDashboard
 * @description
 * Renders analytics charts for Customers, Companies, and Stocks.
 * Fetches data from backend API once on mount and displays the chosen
 * dataset based on user selection. Remembers last selected subject in localStorage.
 *
 * @returns {JSX.Element} The rendered analytics dashboard component.
 */
export default function AIDashboard() {


    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handlePromptChange = async (event) => {
        setPrompt(event.target.value);
    }

    const handleAnalyzer = async (e) => {

        setResponse('');

        const body={ "question": prompt };
        

        let res = await api.post('',body , "AI");

        setResponse(res.explanation);
    }



  return (
    <div className="analytics-container">
      <h1>AI Analytics Dashboard</h1>

        <div className='analysis-form'>
          <input
            name="prompt"
            placeholder="Ask AI a question"
            value={prompt}
            onChange={handlePromptChange}
            required
          />
          <button
            type="button"
            className="btn-primary"
            onClick={() => handleAnalyzer()}
          >
            Send
          </button>
        </div>
        <p>
            {response}
        </p>
      
    </div>
  );
}
