
CREATE OR REPLACE FUNCTION bit_xor(
  _value_a integer,
  _value_b integer
) 
RETURNS integer AS $$
BEGIN
  return _value_a # _value_b;
END;
$$ LANGUAGE plpgsql;

