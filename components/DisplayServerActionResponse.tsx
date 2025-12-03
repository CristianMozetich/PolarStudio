type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

const MessageBox = ({
  type,
  content,
}: {
  type: "error" | "success";
  content: React.ReactNode;
}) => (
  <div
    className={`bg-accent px-4 py-2 m-2 rounded-lg ${
      type === "error" ? "text-red-800" : "text-blue-800 dark:text-yellow-300"
    }`}
  >
    {type === "success" ? "✅ " : "❌ "} {content}
  </div>
);

export function DisplayServerActionResponse({ result }: Props) {
  const { data, serverError, validationErrors } = result;

  return (
    <div>
      {data?.message && (
        <MessageBox type="success" content={`Success: ${data.message}`} />
      )}
      {serverError && <MessageBox type="error" content={serverError} />}
      {validationErrors &&
        Object.keys(validationErrors).map((key) =>
          validationErrors[key]?.map((msg, idx) => (
            <MessageBox
              key={`${key}-${idx}`}
              type="error"
              content={`${key}: ${msg}`}
            />
          ))
        )}
    </div>
  );
}
