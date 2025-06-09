import React from "react";
import PropTypes from "prop-types";

const RoleIndicator = ({ role }) => {
  const roleColors = {
    user: "bg-green-400 dark:bg-green-500",
    moderator: "bg-yellow-400 dark:bg-yellow-500",
    admin: "bg-red-400 dark:bg-red-500",
  };

  const roleLabels = {
    user: "User",
    moderator: "Moderator",
    admin: "Admin",
  };

  return (
    <div className="flex items-center gap-2 transition-all duration-200">
      <div
        className={`w-2 h-2 rounded-full ${roleColors[role]} transition-colors duration-200 shadow-sm`}
        title={`Role: ${roleLabels[role]}`}
        aria-hidden="true"
      />
    </div>
  );
};

RoleIndicator.propTypes = {
  role: PropTypes.oneOf(["user", "moderator", "admin"]).isRequired,
};

export default RoleIndicator;
