"""remove group wage


Revision ID: 05460db6c2f0
Revises: 796917b582c3
Create Date: 2023-08-14 21:50:17.875214

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '05460db6c2f0'
down_revision: Union[str, None] = '796917b582c3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
