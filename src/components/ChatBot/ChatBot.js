import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ChatBot.module.scss';
import { Configuration, OpenAIApi } from 'openai';

const cx = classNames.bind(styles);

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [submit, setSubmit] = useState('');
  const [response, setResponse] = useState([]);

  const configuration = new Configuration({
    organization: 'org-M2CvRC5OmkD0bbfkLY0cMCyg',
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    async function fetchData() {
      const responseFromApi = await openai.createImage({
        prompt: submit,
        n: 10,
        size: '256x256',
      });

      setResponse(Object.values(responseFromApi.data));
    }
    if (submit) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [submit]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(input);
  };
  const items = response[1] || [];
  console.log(items);
  return (
    <div>
      <form>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
      </form>

      {items.length > 0 && (
        <ul className={cx('list_image')}>
          {items.map((items, index) => (
            <li key={index} className={cx('item')}>
              <img src={items.url} alt="" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatBot;
