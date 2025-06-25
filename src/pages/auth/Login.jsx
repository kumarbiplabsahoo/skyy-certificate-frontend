import React from "react";
import styles from "./Login.module.css";
import { FaEye } from "react-icons/fa";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import roundLogo from "../../assets/icons/roundLogo.png";
import Footer from "../../components/ui/Footer";
import { Label } from "../../components/ui/Label";

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.blueLayer}></div>

        <div className={styles.dots}>
          {[...Array(30)].map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 5 + 6;

            return (
              <span
                key={i}
                className={styles.dot}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></span>
            );
          })}
        </div>
        <div className={styles.title}>
          <h2>Skyyskill Academy</h2>
          <p>Premium Admin & Dashboard Template</p>
        </div>
      </div>

      <div className={styles.card}>
        <img src={roundLogo} alt="skyskill logo" style={{ width: "50px" }} />
        <h2 className={styles.welcome}>Welcome Skyyskill Academy !</h2>
        <p>Sign in to continue to Skyyskill Academy</p>

        <form className={styles.form}>
          <Label htmlFor="email">Email </Label>
          <Input
            type="email"
            placeholder="Enter email"
            className={styles.input}
          />

          <Label htmlFor="password">Password</Label>
          <div className={styles.passwordField}>
            <Input
              type="password"
              placeholder="Enter password"
              className={styles.input}
            />
            <FaEye className={styles.eyeIcon} />
          </div>

          <Button type="submit" className={styles.signInBtn}>
            Sign In
          </Button>
        </form>
      </div>
      <Footer
        academyName="Skyyskill Academy"
        brandName="Skyyskill Academy"
        currentYear={2025}
      />
    </div>
  );
};

export default Login;
