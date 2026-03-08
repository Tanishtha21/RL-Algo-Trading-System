# RL-Algo-Trading-System
This project explores the application of Deep Reinforcement Learning (DRL) in high-volatility financial environments. Using a custom OpenAI Gym-compatible environment, I engineered a comparative testing suite for state-of-the-art RL algorithms, including Proximal Policy Optimization (PPO) and Soft Actor-Critic (SAC).

The system maps a high-dimensional state-space—consisting of non-linear technical indicators (MACD, RSI, Bollinger Bands)—to discrete or continuous action spaces for asset allocation. The implementation features a real-time TradeTech Dashboard built with asynchronous JavaScript and Chart.js, allowing for the visualization of cumulative reward trajectories, maximum drawdown, and Sharpe Ratio performance against traditional 'Buy and Hold' benchmarks.
